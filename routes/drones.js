const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then(dronesFromDB => {
    //console.log(dronesFromDB);
    res.render("drones/list.hbs", { drones: dronesFromDB })
  })
  .catch(error => next(error));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const {name, propellers, maxSpeed} = req.body;

  Drone.create({name, propellers, maxSpeed})
  .then(()=>{
    res.redirect("/drones")
   })
  .catch(error => next(error));
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {droneId} = req.params;

  Drone.findById(droneId)
  .then((drone) => {
    res.render("drones/update-form.hbs", {drone: drone})
  })
  .catch(error => next(error));
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {droneId} = req.params;
  const {name, propellers, maxSpeed} = req.body;

  Drone.findByIdAndUpdate( droneId, {name, propellers, maxSpeed})
  .then(() => {
    res.redirect("/drones")
  })
  .catch(error => {
    console.log(error);
    Drone.findById(droneId)
    .then((drone) => {
    res.render("drones/update-form.hbs", {drone: drone})
    })
    .catch(error=> next(error));
  });
});

router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {droneId} = req.params;

  Drone.findByIdAndDelete(droneId)
  .then(()=>{
    res.redirect("/drones")
  })
  .catch(error => next(error));
});

module.exports = router;
