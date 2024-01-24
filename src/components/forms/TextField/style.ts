import {StyleSheet} from 'react-native';

const style = (theme?: 'light' | 'dark') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    label: {
      marginBottom: 5,
      fontSize: 14,
      color: isDark ? 'white' : 'black',
    },
    input: {
      borderRadius: 10,
      backgroundColor: 'white',
      paddingHorizontal: 10,
    },
    iconEye: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    textError: {
      color: 'red',
      marginTop: 5,
    },
  });
};

export default style;
