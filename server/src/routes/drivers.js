const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const { Driver , Teams} =  require ("../db")
const {Sequelize} = require('sequelize');
const express = require ("express");

const { app, readJsonFile , getAllDriver} = require('../utils/getApi');


const router = express();

router.use('/', app);

router.get('/', async (req, res) => {
  try {
    const jsonData = await getAllDriver();
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/nombre"  , async (req, res) =>{
  const {nombre} =req.query;
  console.log("El nombre desde el back fue " , nombre);
  try{ 
    
      const response= await getAllDriver();
      const query = nombre.toLowerCase();
      const responseName = response.filter((element) =>{
            if(element.nombreCompleto.toLowerCase().includes(query)){
                return element;
            }
        });
      if(responseName){
        res.status(200).json(responseName);
      }else{
        res.status(404).send("NO se encontro el nombre");
      }
        
   
    
}catch(error){
  console.log("El error desde la back name fue " , error);
    res.status(404).json(error);
}
});

router.get("/:id" , async(req, res)=>{
  try{
    const {id} = req.params;
    console.log("EL id fue " , id);
    const allDriver = await getAllDriver();
    const response = allDriver.find((driver)=> driver.id == id);
    console.log("El response id es " , response);
    res.status(200).json(response);
  }catch(error){
    console.log("El error fue en get Id" , error);
    res.status(500).json({error : error})
  }
});


router.post("/crear" , async(req, res)=>{
  try{
    const { nombre , apellido, descripcion, imagen , nacionalidad, fechaNacimiento , teams } = req.body;
    const nombreTeams = teams.split(',').map(nombreTeam => nombreTeam.trim());
  
    // Buscar los temas en la base de datos
    const teamsEncontrados = await Teams.findAll({
      where: { nombre: nombreTeams },
    });

    if (!teamsEncontrados.length) {
      // Algunos temas no fueron encontrados, puede que haya errores en los nombres
      return res.status(400).json({ error: "Algunos TEMAS no existen en la base de datos." });
    }

    let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5ZMbjfXHe6oxIvGejyVSkjYrPZehfMVTPxTQycgs-8ZiWiumHH5L6PA7ULosAK9iR5I&usqp=CAU";
    let createDb= true;
    // Crear el examen
    const driver = await Driver.create({ nombre, apellido,descripcion,  img, nacionalidad, fechaNacimiento , createDb });

    // Asociar el examen a los temas correspondientes
    await driver.setTeams(teamsEncontrados);

    // Obtener los temas asociados al examen
    const temasAsociadosAlExamen = await driver.getTeams();
  
    

    
    let unDriver = await Driver.findAll({
      include: 
        {
          model: Teams,
          attributes: ['nombre'],
          through: {
            attributes: []
          }
  }});

    res.status(200).json(unDriver);

  }catch(error){
    console.log("El error fue ", error)
    res.status(500).send(error);
  }
});

router.put("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("El id del put es ", id);
    
    // Obtén el driver existente que deseas actualizar
    const someDriver = await Driver.findByPk(id);

    if (!someDriver) {
      console.log("No se encontró el driver");
      return res.status(404).json({ error: "No se encontró el driver" });
    } else {
      const { nombre, apellido, descripcion, imagen, nacionalidad, fechaNacimiento, teams } = req.body;
      
      // Actualiza los campos del driver
      someDriver.nombre = nombre;
      someDriver.apellido = apellido;
      someDriver.descripcion = descripcion;
      someDriver.imagen = imagen;
      someDriver.nacionalidad = nacionalidad;
      someDriver.fechaNacimiento = fechaNacimiento;

      // Obtiene una lista de los nombres de los equipos enviados
      const nombreEquipos = teams.split(',').map(nombreEquipo => nombreEquipo.trim());

      // Encuentra los equipos en la base de datos
      const equiposEncontrados = await Teams.findAll({
        where: { nombre: nombreEquipos },
      });

      if (!equiposEncontrados.length) {
        return res.status(400).json({ error: "Algunos equipos no existen en la base de datos." });
      }

      // Actualiza la asociación de equipos para el driver
      await someDriver.setTeams(equiposEncontrados);

      await someDriver.save();
      console.log("El driver modificado es ", someDriver);
      res.status(200).json(someDriver);
    }
  } catch (error) {
    console.log("El error en el put fue ", error);
    res.status(500).json({ error: error });
  }
});

router.delete("/borrar/:id" , async (req , res) =>{
  try{

    const {id} = req.params;
    console.log("EL id es ", id);
    let driverDelete = await Driver.findByPk(id);
    if(!driverDelete){
      res.status(404). send("No se encontro el driver del delete");
    }
    else{
      await driverDelete.destroy();
      console.log("Se logro");
      const respuesta = await getAllDriver();
      res.status(200).json(respuesta);
    }

  }catch(error){
    console.log("El error fue  en delete" , error );
    res.status(500);
  }
})





     

      

module.exports= router;