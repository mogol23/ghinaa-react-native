import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import global from './global';
import user from './user';
import transfer from './transfer';
import conversion from './conversion';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, {
  user,
  global,
  transfer,
  conversion,
});

export default reducer;
