import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';

import Swiper from 'react-native-swiper';

import {Colors, Fonts, moderateScale, scale} from '@utils/theme';
import BaseLayout from '@components/BaseLayout';
import {Back, Cart, Star} from '@assets/icons';

const ProductScreen = ({route, navigation}) => {
  const {item} = route.params;

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <>
      <BaseLayout>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Product
          </Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={{height: moderateScale(350)}}>
            <Swiper
              style={styles.wrapper}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}>
              <View style={styles.imageView}>
                <Image
                  source={{uri: item.thumbnail}}
                  resizeMode={'contain'}
                  style={styles.SwiperStyle}
                />
              </View>
              <View style={styles.imageView}>
                <Image
                  source={{uri: item.images[0]}}
                  resizeMode={'contain'}
                  style={styles.SwiperStyle}
                />
              </View>
              <View style={styles.imageView}>
                <Image
                  source={{uri: item.images[1]}}
                  resizeMode={'contain'}
                  style={styles.SwiperStyle}
                />
              </View>
              <View style={styles.imageView}>
                <Image
                  source={{uri: item.images[2]}}
                  resizeMode={'contain'}
                  style={styles.SwiperStyle}
                />
              </View>
            </Swiper>
          </View>
        </View>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(0.2),
            }}>
            <View style={styles.box}>
              <Text style={styles.title1}>{item.stock} stock</Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                left: moderateScale(15),

                alignItems: 'center',
              }}>
              <Star />
              <Text
                style={{
                  fontSize: scale(15),
                  textAlignVertical: 'center',
                  fontSize: moderateScale(12.5),
                  fontFamily: Fonts.REGULAR,
                  color: Colors.BLACK,
                }}>
                {item.rating} (4,749 reviews)
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: moderateScale(2),
              marginTop: moderateScale(0.5),
            }}>
            <Text style={styles.productprice}>₹{item.price}</Text>
            <Text style={styles.productprice1}>₹{item.discountPercentage}</Text>
          </View>

          <Text
            style={{
              color: Colors.BLACK,
              fontSize: scale(15),
              marginTop: moderateScale(1),
              fontFamily: Fonts.REGULAR,
            }}>
            {item.description}
          </Text>
        </View>

        <View style={{marginTop: moderateScale(100)}}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Cart />
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: scale(20),
              }}>
              {isAddedToCart ? 'Added ' : 'Add To Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
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
  SwiperStyle: {
    width: '95%',
    height: moderateScale(280),
    alignSelf: 'center',
  },
  wrapper: {},
  dot: {
    backgroundColor: Colors.WHITE,
    width: moderateScale(15),
    height: moderateScale(8),
    borderRadius: moderateScale(5),
    borderColor: Colors.GRAY_COLOR,
    borderWidth: moderateScale(1.2),
    marginLeft: moderateScale(2),
    marginRight: moderateScale(2),
  },
  activeDot: {
    backgroundColor: Colors.PRIMARY_COLOR,
    width: moderateScale(16),
    height: moderateScale(8),
    borderRadius: moderateScale(5),
    marginLeft: moderateScale(2),
    marginRight: moderateScale(2),
  },

  title1: {
    fontSize: scale(15),
    fontFamily: Fonts.REGULAR,

    color: Colors.BLACK,
  },
  box: {
    width: moderateScale(80),
    height: moderateScale(25),
    backgroundColor: '#CACFD2',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    marginTop: moderateScale(0.5),
    alignItems: 'center',
  },

  productprice: {
    fontSize: scale(16),
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: moderateScale(2),
  },
  productprice1: {
    fontSize: scale(12),
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: moderateScale(5.5),
    textDecorationLine: 'line-through',
    left: moderateScale(5),
  },

  title: {
    color: Colors.BLACK,
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(19),
  },
  button: {
    width: '95%',
    height: moderateScale(50),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_COLOR,

    alignSelf: 'center',
    flexDirection: 'row',
  },
  imageView: {
    height: moderateScale(400),
    top: 20,
  },
});
export default ProductScreen;
