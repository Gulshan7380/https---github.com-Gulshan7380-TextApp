import {View, SafeAreaView} from 'react-native';
import React, {memo} from 'react';
import {Colors} from '@utils/theme';

const BaseLayout = ({children, backgroundColor}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor
          ? backgroundColor
          : Colors.BACKGROUND_COLOR,
      }}>
      <View style={{flex: 1}}>{children}</View>
    </SafeAreaView>
  );
};

export default memo(BaseLayout);
