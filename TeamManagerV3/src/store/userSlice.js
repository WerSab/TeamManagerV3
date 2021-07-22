import {createSlice} from '@reduxjs/toolkit';
let data = [
  {
    category: 'Zawodnik',
    id: 0,
    firstName: 'a',
    lastName: 'a',
    email: 'a',
    age: 'a',
    adres: 'a,',
    password: 'a',
    login: '1',
  },

  {
    category: 'Zawodnik',
    id: 1,
    firstName: 'b',
    lastName: 'b',
    email: 'b',
    age: 'b',
    adres: 'b,',
    password: 'b',
    login: '2',
  },
     
];
const userSlice = createSlice({
  name: 'user',
  initialState: data,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => [...state, action.payload],

    deleteUser: (state, action) => {
      // niepofiltrowana tablica - kopia stora
      let items = state;
      // pofiltrowana tablica
      // action payload = to co dostajesz
      let filtered = items.filter(element => {
        return element.id !== action.payload;
      });
      return filtered;
    },
    logInUser: (state, action) => {
      let items = state;
      for (let i = 0; i < userSlice.length; i++) {
        if (
          items[i].email === action.payload.email &&
          items[i].password === action.payload.password
        )
          return (items[i].login = '2');
      }
      return items;
    },
  },
});
export default userSlice;
