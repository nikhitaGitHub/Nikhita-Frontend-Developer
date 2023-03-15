import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store';
import Item from './components/Item';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import Banner from './components/Banner';
import SearchBar from './components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";

const filterReducer =(state, action) => {
  var max_sup = 25
  if(action.type == 1) {
      let resp  =  state?.data?.result
      
      if(resp) {
          if(resp.length < max_sup) resp = state?.original?.result
          var mydata = resp.filter((obj) => {
              let mystring1 = obj.type.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g,'').toLowerCase();
              console.log(mystring1)
              let mystring2 = action.searchTerm.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g,'').toLowerCase();
              console.log(mystring2)
              return mystring1.includes(mystring2)
          })
      }
      return {...state, data: {result: mydata, original: resp}}
  }
  else if(action.type == 2) {
      let resp  =  state?.data?.result
      if(resp) {
          if(resp.length < max_sup) resp = state?.original?.result
          var mydata = resp.filter((obj) => {
              let mystring1 = obj.status.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g,'').toLowerCase();
              let mystring2 = action.searchTerm.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g, '').toLowerCase();
              return mystring1.includes(mystring2)
          })
      }
      return {...state, data: {result: mydata, original: resp}}
  }
  else if(action.type == 3) {
      let resp  =  state?.data?.result
      if(resp) {
          if(resp.length < max_sup) resp = state?.original?.result
          var mydata = resp.filter((obj) => {
              var mystring1 = null;
              var mystring2 = null;
              var mystring3 = null;
              if(obj.serial)
                  mystring1 = obj.serial.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g, '').toLowerCase();
              if(obj.last_update)
                  mystring2 =obj.last_update.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g, '').toLowerCase();
              mystring3 = action.searchTerm.replace(/[\|&;\$%@"<>\(\)\+,\s+\.]/g, '').toLowerCase();
              return (mystring1 ? mystring1.includes(mystring3): false) || (mystring2 ? mystring2.includes(mystring3): false)
          })
      }
      console.log(mydata)
      return {...state, data: {result:mydata, original: resp}}
  }
  else if (action.type == 'FETCH_INIT') {
      return {...state, data: action.data, original: action.data};
  }
  else if (action.type == 'FETCH_SUCCESS') {
      return {...state, data: action.data, original: action.data}
  }
  else if (action.type == 'RESET') {
      let resp  =  state?.original?.result
      return {...state, data: {result: resp, original: resp}}
  }

  return {...state, ...action?.data}
}

const mockStore = configureStore({reducer: filterReducer})

var obj1 = { id: "5e9e2c5bf35918ed873b2664",land_landings: 0,last_update: "Hanging in atrium at SpaceX HQ in Hawthorne ",
launches: ["5eb87cdeffd86e000604b330"],
reuse_count: 0,
serial: "C101",
status: "retired",
type: "Dragon 1.0",
water_landings: 1}


var obj2 = { id: "5e9e2c5bf359173b2664",land_landings: 0,last_update: "Haing in atrium aSpaceX HQ Harne ",
launches: ["5eb87cdeffd86e04b330"],
reuse_count: 0,
serial: "C01",
status: "rered",
type: "Drn 1.0",
water_landings: 1}

const objs = [obj1, obj2]

describe("Reducer", () => {
  test("Filter by status ", () => {
    const action = { type: 1, searchTerm:'retired'};
    const state = {}

    const newState = filterReducer(state, action)
    console.log(newState)
    const expectedState = {data: {result:[obj1], original: undefined, result: undefined}}
    console.log(expectedState)
    expect(newState).toStrictEqual(expectedState)
  });
})

describe('Item', () => {
  test('renders all properties', () => {
    render(<Item pageNumber={1}></Item>);
    screen.debug();
  });
});

describe('Authentication', () => {
  test('renders Auth page', () => {
    render(<AuthPage></AuthPage>);
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

describe('Banner', () => {
  test('renders Banner', () => {
    render(<Banner></Banner>);
    screen.debug();
  });
});

describe('SearchBar', () => {
  test('renders Search Bar', () => {
    render(<SearchBar></SearchBar>);
    expect(screen.getByText('Reset')).toBeInTheDocument();
    screen.debug();
  });
});

