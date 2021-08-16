import {createSlice} from '@reduxjs/toolkit';
let data = [
   {
    gameID: 0,
    round: 'III Liga Małopolska seniorów 2021',
    gamePlayerID: 0,
   }
];
const gameSlice = createSlice({
  name: 'game',
  initialState: data,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addGame: (state, action) => [...state, action.payload],
  },
});
export default gameSlice;
console.log('gameSlice', data.length, data);
