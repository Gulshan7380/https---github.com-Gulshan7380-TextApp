import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, memo} from 'react';
import {Colors, Fonts, moderateScale, scale} from '@utils/theme';
import {Eye, EyeClose} from '@assets/icons';

const BaseTextInput = ({
  inputRef,
  value,
  onChange,
  onSubmit,
  keyboard = 'default',
  placeholder,
  maxLength = undefined,
  isSecured = false,
  multiline = false,
  autoCapitalize = 'true',
  externalStyle = {},
  defaultValue = '',
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hide, setHide] = useState(isSecured);

  return (
    <View style={{height: moderateScale(60), alignItems: 'stretch'}}>
      <View
        style={[
          styles.container,
          {
            borderWidth: isFocused ? moderateScale(1.5) : moderateScale(1),
            height: moderateScale(50),
          },
          externalStyle,
        ]}>
        <View style={{justifyContent: 'center',marginRight:moderateScale(5)}}>{icon}</View>
        <TextInput
          ref={inputRef}
          value={value}
          defaultValue={defaultValue}
          onChangeText={e => {
            if (keyboard === 'number-pad') {
              const trimValue = e.replace(/[^0-9]/g, '');
              onChange(trimValue);
              return;
            }
            onChange && onChange(e);
          }}
          keyboardType={keyboard}
          onSubmitEditing={() => onSubmit && onSubmit()}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          secureTextEntry={hide}
          cursorColor={Colors.BLACK}
          style={[styles.containerTextStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isSecured ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: moderateScale(15),
              alignSelf: 'center',
            }}
            onPress={() => setHide(!hide)}
            activeOpacity={0.4}
            accessibilityRole={'button'}>
            {hide ? <EyeClose /> : <Eye />}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default memo(BaseTextInput);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(12),
    paddingLeft: moderateScale(13),
    backgroundColor: Colors.GRAY2,
    borderColor: Colors.BLACK,
    borderWidth: moderateScale(0.8),
    flexDirection: 'row',
  },
  containerTextStyle: {
    fontFamily: Fonts.MEDIUM,
    fontSize: scale(15),
    color: Colors.BLACK,
    flex: 1,
    maxWidth: '95%',
  },
});
