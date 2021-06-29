import {createSlice} from '@reduxjs/toolkit';
let data = [
  {
    category: 'turniej',
    id: 0,
    date: '29.05 - 27.06.2021',
    name: 'III Liga Małopolska seniorów 2021',
    city: 'Kraków',
    link: 'http://www.chessarbiter.com/turnieje/2021/tdr_1045/',
  },

  {
    category: 'turniej',
    id: 1,
    date: '10.07.2021',
    name: 'III Otwarty Całoroczny Turniej Juniorów i Seniorów',
    city: 'Myślibórz',
    link: 'http://www.chessarbiter.com/turnieje/2021/ti_245/',
  },
  {
    category: 'turniej',
    id: 2,
    date: '18.07.2021',
    name: 'I Mistrzostwa w szachach szybkich w Skwierzynie',
    city: 'Skwierzyna',
    link: 'http://www.chessarbiter.com/turnieje/2021/tdr_1045/',
  },
  {
    category: 'liga',
    id: 2,
    date: '18.07.2021',
    name: 'Zawody szachowe dla przedszkolaków',
    city: 'Skwierzyna',
    link: 'http://www.chessarbiter.com/turnieje/2021/tdr_1045/',
  },
];

const turniejeSlice = createSlice({
  name: 'turnieje',
  initialState: data,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    addTurniej: (state, action) => [...state, action.payload],

    deleteElement: (state, action) => {
      // niepofiltrowana tablica - kopia stora
      let items = state;
      // pofiltrowana tablica
      // action payload = to co dostajesz
      let filtered = items.filter(element => {
        return element.id !== action.payload;
      });
      return filtered;
    },
  },
});

export default turniejeSlice;

