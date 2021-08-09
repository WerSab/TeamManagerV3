import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import turniejeSlice from './turniejeSlice';
import userSlice from './userSlice';
import gameSlice from './gameSlice';
import loginSlice from './loginSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['user', 'turnieje', 'game', 'login'],
}

const reducer = combineReducers({
  user: userSlice.reducer,
  turnieje: turniejeSlice.reducer,
  game: gameSlice.reducer,
  login: loginSlice.reducer,
})


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistor = persistStore(store);
console.log(store.getState());

export const turniejeActions = turniejeSlice.actions
export const userActions = userSlice.actions
export const gameActions = gameSlice.actions
export const loginActions = loginSlice.actions


