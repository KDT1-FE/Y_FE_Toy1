import React from 'react';
import './App.css';
import {BoardNav } from 'components/Wiki/BoardNav';
import { BoardContent } from 'components/Wiki/BoardContent';
import { Wiki } from 'components/Wiki/Wiki';
import {Provider} from 'react-redux'
import { store } from 'redux/store';
function App() {
  return (<>

  <Provider store={store}>
    <Wiki/>
  </Provider>
  </>)
}

export default App;
