const {request} = require("express");
const asyncHandler = require("express-async-handler");

const User = require('../models/userModel');
const List = require('../models/listModel');

// @desc    Get Lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
    const lists = await List.find({user : req.user.id});
    res.status(200).json({lists});
})

// @desc    Get Lists by Source
// @route   GET /api/lists/:src
// @access  Private
const getListsBySource = asyncHandler(async (req, res) => {
    const lists = await List.find({source : req.params.src, user : req.user.id});
    res.status(200).json({lists});
})

// @desc    Set a List
// @route   POST /api/lists
// @access  Private
const setList = asyncHandler(async (req, res) => {
    
    if(!(req.body.title && req.body.source))
    {
        res.status(400);
        throw new Error("Invalid List Params");
    }

    const newList = await List.create({
        source : req.body.source,
        user : req.user.id,
        title : req.body.title,
    })

    res.status(201).json(newList);
})

// @desc    Update a List
// @route   PUT /api/lists
// @access  Private
const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id);

    if(!list)
    {
        res.status(400);
        throw new Error("List not found")
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(list.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new : true});

    res.status(200).json(updatedList);
})

// @desc    Delete a List
// @route   DELETE /api/lists
// @access  Private
const deleteList = asyncHandler(async (req, res) => {

    const list = await List.findById(req.params.id);

    if(!list)
        {
            res.status(400);
            throw new Error("List not found");
        }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(list.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await list.remove();
    res.status(200).json({id : req.params.id});

})

module.exports = {
    getLists,
    getListsBySource,
    setList,
    updateList,
    deleteList
}