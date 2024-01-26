import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

const style = StyleSheet.create({
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
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
