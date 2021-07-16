import { createSlice } from '@reduxjs/toolkit';
let data = [
  {
    category: 'Zawodnik',
    id: 1,
    firstName: 'Jan',
    lastName: 'Nowak',
    email: 'emailInput',
    age: '18',
    adres: 'Pcim 4,',
    password: 'emailInput',
  },

  {
    category: 'Zawodnik',
    id: 2,
    firstName: 'Maria',
    lastName: 'Kowal',
    email: 'emailInput',
    age: '18',
    adres: 'Pcim 4,',
    password: 'emailInput',
  },
  {
    category: 'Zawodnik',
    id: 3,
    firstName: 'Jan',
    lastName: 'Nowak',
    email: 'emailInput',
    age: '18',
    adres: 'Pcim 4,',
    password: 'emailInput',
  },
  {
    category: 'Zawodnik',
    id: 4,
    firstName: 'Jan',
    lastName: 'Nowak',
    email: 'emailInput',
    age: '18',
    adres: 'Pcim 4,',
    password: 'emailInput',
  },
  {
    category: 'Zawodnik',
    id: 5,
    firstName: 'Jan',
    lastName: 'Nowak',
    email: 'emailInput',
    age: '18',
    adres: 'Pcim 4,',
    password: 'emailInput',
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
  }
});
export default userSlice;