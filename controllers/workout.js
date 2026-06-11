const Workout = require('../models/Workout');
const {errorHandler} = require('../auth');

module.exports.addWorkout = (req, res) => {
    let { name, duration } = req.body;

    let newWorkout = new Workout({
        userId: req.user.id,
        name,
        duration
    })

    Workout.findOne({ name })
    .then(existingWorkout => {
        if(existingWorkout)
            return res.status(409).send({ message: "Workout already added"});

        return newWorkout.save()
        .then(addedWorkout => res.status(201).send({ addedWorkout }))
        .catch(err => errorHandler(err, req, res));
    })
    .catch(err => errorHandler(err, req, res));
}

module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({})
    .then(workouts => {
        if(workouts.length < 1)
            return res.status(404).send({ message: "No workouts found" });

        return res.status(200).send({ workouts });
    })
    .catch(err => errorHandler(err, req, res));
}

module.exports.updateWorkout = (req, res) => {
    let { name, duration } = req.body;

    let updatedWorkout = {
        name, 
        duration
    };

    return Workout.findByIdAndUpdate(
        req.params.workoutId,
        updatedWorkout,
        {new: true}
    )
    .then(workout => {
        if(!workout)
            return res.status(404).send({ message: "Workout not found" });

        return res.status(200).send({
            message: "Workout updated successfully",
            updatedWorkout: workout
        });
    })
    .catch(err => errorHandler(err, req, res));
}

module.exports.completeWorkoutStatus = (req, res) => {
    return Workout.findById(req.params.workoutId)
    .then(workout => {
        if(!workout)
            return res.status(404).send({ message: "Workout not found" });

        if(workout.status === 'completed')
            return res.status(200).send({ message: "Workout is already completed" });

        workout.status = "completed";

        return workout.save()
        .then(updatedWorkout => res.status(200).send({
            message: "Workout status updated successfully",
            updatedWorkout
        }))
        .catch(err => errorHandler(err, req, res));;
    })
    .catch(err => errorHandler(err, req, res));
}

module.exports.deleteWorkout = (req, res) => {
    return Workout.findByIdAndDelete(req.params.workoutId)
    .then(workout => {
        if(!workout)
            return res.status(404).send({ message: "Workout not found" });

        return res.status(200).send({ message: "Workout deleted successfully"});
    })
    .catch(err => errorHandler(err, req, res));
}