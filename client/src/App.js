import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import LadinPage from "./Componets/LadinPage/LadinPage";
import DriverContainer from "./Componets/Home/DriverContainer";
import DriverId from "./Componets/DriverId/DriverId";
import Form from "./Componets/CreateDriver/Form";
import UpdateDriver from './Componets/UpdateDriver/UpdateDriver';
import "./App.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";
const App = () => {
    return (
        <div >
            <BrowserRouter>
      <Route exact path='/' component={LadinPage}/>
      <Route exact path='/drivers' component={DriverContainer}/>
      <Route exact path='/createDriver' component={Form}/>
      <Route exact path='/drivers/:id' component={DriverId}/>
      <Route exact path='/drivers/editar/:id' component={UpdateDriver}/>
        
      </BrowserRouter>
        </div>
    );
}

export default App;
