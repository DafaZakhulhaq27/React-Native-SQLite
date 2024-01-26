import {StyleSheet} from 'react-native';
import Colors from '../../../styles/colors';

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '48%',
    backgroundColor: 'white',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    alignSelf: 'flex-start',
    backgroundColor: Colors.PRIMARY,
  },
});

export default style;
