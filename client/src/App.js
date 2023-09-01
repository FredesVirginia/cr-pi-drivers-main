import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import LadinPage from "./Componets/LadinPage/LadinPage";
import DriverContainer from "./Componets/Home/DriverContainer";
import "./App.css";
const App = () => {
    return (
        <div >
            <BrowserRouter>
      <Route exact path='/' component={LadinPage}/>
      <Route exact path='/drivers' component={DriverContainer}/>
     


      </BrowserRouter>
        </div>
    );
}

export default App;
