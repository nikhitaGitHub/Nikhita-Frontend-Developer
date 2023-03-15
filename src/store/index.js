import { configureStore } from '@reduxjs/toolkit'

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
const store = configureStore({reducer: filterReducer});

export default store;