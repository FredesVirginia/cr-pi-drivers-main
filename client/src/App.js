import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import LadinPage from "./Componets/LadinPage/LadinPage";
import DriverContainer from "./Componets/Home/DriverContainer";
import CreateDriver   from "./Componets/CreateDriver/CreateDriver";
import Form from "./Componets/CreateDriver/Form";
import "./App.css";
const App = () => {
    return (
        <div >
            <BrowserRouter>
      <Route exact path='/' component={LadinPage}/>
      <Route exact path='/drivers' component={DriverContainer}/>
      <Route exact path='/createDriver' component={Form}/>


      </BrowserRouter>
        </div>
    );
}

export default App;
