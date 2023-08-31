const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const { Driver , Teams} =  require ("../db")
const {Sequelize} = require('sequelize');
const express = require ("express");

const { app, readJsonFile , getAllDriver , getAllTeams} = require('../utils/getApi');

const router = express();

router.use('/', app);

router.get('/', async (req, res) => {
  try {
    const allTeams = await getAllTeams();
    
    console.log("Los datos de generos son " , allTeams)
    allTeams.forEach((team) =>{
        Teams.findOrCreate({
            where : {
                nombre: team
            }
        })
    });

    const response = await Teams.findAll();
   
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




     

      

module.exports= router;