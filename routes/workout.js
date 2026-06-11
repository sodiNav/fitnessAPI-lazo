const express = require(`express`);
const router = express.Router();
const workoutController = require(`../controllers/workout`);

const { verify } = require('../auth');

router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

router.post("/addWorkout", verify, workoutController.addWorkout);

router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout);

router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkoutStatus);

router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout);

module.exports = router;