// import React, {Component} from 'react';
// import {StatusBar} from 'react-native';

// import Routes from './routes';

// export default class App extends Component {
//   render() {
//     return (
//       <>
//         <Routes />
//         <StatusBar barStyle="light-content" backgroundColor="#03e5ed" />
//       </>
//     );
//   }
// }

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#03e5ed" />
        <App />
      </PersistGate>
    </Provider>
  );
}

