import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Colors, Fonts, moderateScale, scale, verticalScale} from '@utils/theme';
import BaseLayout from '@components/BaseLayout';
import {Refresh} from '@assets/icons';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const URL = 'https://dummyjson.com/';
  const EndPoint = 'products';

  const fetchData = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`${URL}${EndPoint}?page=${pageNumber}`);
      const newData = response.data.products;

      if (pageNumber === 1) {
        setData(newData);
      } else {
        setData(prevData => [...prevData, ...newData]);
      }

      setLoading(false);
      setRefreshing(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(1);
  };

  const handleRefreshButton = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(1);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      fetchData(page + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
      </View>
    );
  }

  const navigateToProductPage = item => {
    navigation.navigate('ProductScreen', {item});
  };

  return (
    <BaseLayout>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          style={{marginTop: moderateScale(15)}}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{margin: moderateScale(10)}} />
          )}
          ListFooterComponent={() => (
            <View
              style={{paddingBottom: verticalScale(25), alignItems: 'center'}}>
              {isLoadingMore && (
                <ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
              )}
            </View>
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.productContainer}
              activeOpacity={0.7}
              onPress={() => navigateToProductPage(item)}>
              <Image source={{uri: item.thumbnail}} style={styles.image} />
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.PRIMARY_COLOR]}
            />
          }
        />
        <View style={{}}>
          <View style={styles.refreshButtonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.refreshButton}
              onPress={handleRefreshButton}>
              <Refresh />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    height: moderateScale(50),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    elevation: 2,
  },
  headerTitle: {
    alignSelf: 'center',
    position: 'absolute',
    fontSize: scale(18),
    fontFamily: Fonts.Bold,
    color: Colors.BLACK,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    marginHorizontal: moderateScale(12),
    backgroundColor: Colors.WHITE,
    width: '44%',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
  },
  image: {
    width: verticalScale(160),
    height: verticalScale(150),
    resizeMode: 'stretch',
  },
  title: {
    fontSize: scale(15),
    maxWidth: '85%',
    marginHorizontal: moderateScale(5),
    fontFamily: Fonts.MEDIUM,
    color: Colors.TEXT_COLOR,
  },
  price: {
    fontSize: scale(15),
    fontFamily: Fonts.MEDIUM,
    marginHorizontal: moderateScale(5),
    color: Colors.TEXT_COLOR,
  },
  refreshButtonContainer: {
    alignSelf: 'flex-end',
    bottom: 5,
    position: 'absolute',
  },
  refreshButton: {
    backgroundColor: Colors.PRIMARY_COLOR,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    color: Colors.RED,
    fontFamily: Fonts.MEDIUM,
    fontSize: scale(16),
  },
});
