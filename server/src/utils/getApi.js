const express = require('express');
const path = require('path');
const {Driver , Teams} = require ("../db.js");
const app = express();

app.use(express.json());

async function readJsonFile() {
  try {
    const jsonPath = path.join(__dirname, '..', '..', 'api', 'db.json');
    const jsonData = require(jsonPath);

    const jsonDataa = jsonData.drivers.map((driver) =>{
      return {
        id : driver.id,
        nombre : driver.name.forename,
        apellido : driver.name.surname,
        nombreCompleto : driver.name.forename + ' ' + driver.name.surname,
        descripcion : driver.description,
        imagen: driver.image.url,
        nacionalidad : driver.nationality,
        fechaNacimiento : driver.dob,
        createBBDD: false,
        teams: driver.teams 
      }
    })
    return jsonDataa;
  } catch (error) {
    console.error(error);
    throw new Error('Error reading JSON file');
  }
}


async function readBBDD (){
    try{
       let driver = await Driver.findAll(
        {
          include: 
            {
              model: Teams,
              as: 'Teams',
            },
            
        }

       );

       if(driver){
        driver = driver.map((d) =>{
          return {
               id: d.id,
               nombre: d.nombre,
               apellido : d.apellido,
               nombreCompleto : d.nombre + ' ' + d.apellido,
               descripcion: d.descripcion,
               nacionalidad : d.nacionalidad,
               fechaNacimiento: d.fechaNacimiento,
               createBBDD: d.createBBDD,
               teams: d.Teams.map((team) => {
                 return  team.nombre;
                 }).join(" , "),
   
        } });
   
        return driver;
       }

       else{
        return []
       }
      
    }catch(error){
            console.log("el error en readBBD fue " , error);
            throw new Error("Error e readBBDD");
    }
}


async function getAllDriver(){
    const driverApi = await readJsonFile();
    const driverBBDD = await readBBDD();
    const allDriver = [
        ...driverBBDD, // Agregar todos los objetos individuales de la base de datos
        ...driverApi // Agregar todos los objetos individuales del JSON
    ];
    return allDriver; 
}

async function getAllTeams() {
  const jsonFile = await readJsonFile();
  console.log("por aqui", jsonFile);

  if (!jsonFile || !Array.isArray(jsonFile)) {
      console.error("Datos incorrectos en el archivo JSON");
      return [];
  }

  const allTeams = jsonFile
      .flatMap(driver => driver.teams ? driver.teams.split(',') : [])
      .map(team => team.trim())
      .filter(team => team !== "");

  const uniqueTeams = [...new Set(allTeams)];

  console.log("Los equipos en la función son", uniqueTeams);
  return uniqueTeams;
}






module.exports = { app, readJsonFile , readBBDD , getAllDriver , getAllTeams};
