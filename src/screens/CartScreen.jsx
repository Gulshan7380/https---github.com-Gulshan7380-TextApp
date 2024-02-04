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

const CartScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const URL = 'https://dummyjson.com/';
  const EndPoint = 'products';

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}${EndPoint}`);
      setData(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
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

  return (
    <BaseLayout>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data.products}
          numColumns={2}
          style={{marginTop: moderateScale(15)}}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{margin: moderateScale(10)}} />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                paddingBottom: verticalScale(25),
                alignItems: 'center',
              }}></View>
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.productContainer}
              activeOpacity={0.7}>
              <Image source={{uri: item.thumbnail}} style={styles.image} />
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.PRIMARY_COLOR]}
            />
          }
        />
      </View>
    </BaseLayout>
  );
};

export default CartScreen;

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
