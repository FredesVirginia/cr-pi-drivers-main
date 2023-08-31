import React from 'react';
import Nav from "../Nav/Nav";
import Driver from "./Driver";
import {getAllDriver} from "../../Redux/actions";


const DriverContainer = () => {
    return (
        <div>
            <Nav/>
            <h1>Hola estamos en container</h1>
        </div>
    );
}

export default DriverContainer;
