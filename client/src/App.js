import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Login from "../src/Components/Login";
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import "./App.css";

const App = () => {
    return (
        <div >
            <BrowserRouter>
      <Route exact path='/' component={Login}/>
      <Route exact path='/drivers' component={Register}/>
      <Route exact path='/createDriver' component={Dashboard}/>
    
        
      </BrowserRouter>
        </div>
    );
}

export default App;