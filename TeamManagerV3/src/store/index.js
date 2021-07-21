import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turniejeSlice from './turniejeSlice';
import userSlice from './userSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['user', 'turnieje'],
}

const reducer = combineReducers({
  user: userSlice.reducer,
  turnieje: turniejeSlice.reducer
})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistor = persistStore(store);
console.log(store.getState());

export const turniejeActions = turniejeSlice.actions
export const userActions = userSlice.actions

