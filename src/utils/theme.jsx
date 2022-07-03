import { extendTheme } from 'native-base';

export default extendTheme({
  components: {
    Center: {
      baseStyle: {
        _text: {
          color: 'darkBlue.500',
        },
      },
    },
    Button: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'blue',
        my: 3,
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    FormControl: {
      defaultProps: {
        my: 2,
      },
    },
    FormControlLabel: {
      baseStyle: {
        _text: {
          color: 'darkBlue.500',
        },
      },
    },
    Input: {
      defaultProps: {
        colorScheme: 'light',
      },
      baseStyle: {
        _focus: {
          borderColor: 'darkBlue.600',
        },
      },
    },
  },
});
