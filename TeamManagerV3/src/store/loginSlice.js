import {createSlice} from '@reduxjs/toolkit';
let data = [
   
];
const loginSlice = createSlice({
  name: 'login',
  initialState: data,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addLogin: (state, action) => [...state, action.payload],
  },
});
export default loginSlice;
console.log('loginSlice', data.length, data);
