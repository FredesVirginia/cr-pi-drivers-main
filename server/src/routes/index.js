const { Router } = require('express');
const driverRouter = require("./drivers");
const teamsRouter = require('./teams');


const router = Router();

router.use('/drivers', driverRouter);
router.use("/teams" , teamsRouter);


  
module.exports = router;