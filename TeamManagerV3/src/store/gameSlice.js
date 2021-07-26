import {createSlice} from '@reduxjs/toolkit';
let data = [
  {
    id: 0,
    game: 0,
    player: 0,
  },

  {
    id: 0,
    game: 0,
    player: 0,
  },
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
console.log('gameSlice', data.length);
