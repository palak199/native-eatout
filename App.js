
import React,{Component} from 'react';
import Main from './components/MainComponent';
import {PersistGate} from 'redux-persist/es/integration/react'
import {Provider} from 'react-redux';
import {Loading} from './components/LoadingComponent';
import {ConfigureStore} from './redux/configureStore';
const {persistor, store} =ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
         Loading={<Loading/>}
         persistor={persistor}>
       <Main/>
      </PersistGate>
      </Provider>
    );
  }
}