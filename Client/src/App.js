import React from 'react';
import Home from './components/BasicComponents/Home.js';
import Maps from './components/BasicComponents/Maps.js';
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/BasicComponents/Navbar.js';
import Search from './components/BasicComponents/Search.js';

import store from './store';
import MyBusinessPage from './components/BusinessComponents/MyBusinessPage';
function App() {
  return (
    <Provider store={store}>
     <BrowserRouter>
     
    <div className="App">
        
        <Route  exact path="/" component={Home}/>
        
        <Route path="/mapView" component={Maps}/>
        <Route path="/sellerView" component={MyBusinessPage}/>
        
        <Navbar/>
        
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
