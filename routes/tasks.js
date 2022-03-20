const express = require('express');
const router = express.Router();
const Task = require('../models/task')

// Getting all

router.get('/', async (req, res)=>{
    try {
        const  tasks = await Task.find();
        res.json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Getting One
router.get('/:id',getTask ,async (req, res)=>{
    res.send(res.task)
})

// Updating One
router.patch('/:id', getTask ,async (req, res)=>{
    if(req.body.name != null){
        res.task.name=req.body.name;
    }
    if(req.body.status != null){
        res.task.status=req.body.status;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

// DELETING ONE
router.delete('/:id',getTask ,async (req, res)=>{
    try {
        await  res.task.remove();
        res.json({message:'Deleted Task'})
    } catch (error) {
        res.status(500).json({message: error.message});

    }
})
// Creating one

router.post('/', async(req, res)=>{
    const task = new Task({
        name:req.body.name,
        status :req.body.status
    })
    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }
    catch(err){
        
        res.status(400).json({message: err.message});

    }

})


async function getTask(req, res, next){
    let task
    try {
        task=await Task.findById(req.params.id);
        if(task == null){
           return  res.status(404).json({message: 'Cannot find task'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});

    }
    res.task = task
    next()

}

module.exports = router;