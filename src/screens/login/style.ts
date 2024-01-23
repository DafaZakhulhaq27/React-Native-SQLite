import {StyleSheet} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import Colors from '../../styles/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARK,
  },
  containerForm: {
    ...globalStyles.pDefault,
    width: '100%',
  },
});

export default style;
