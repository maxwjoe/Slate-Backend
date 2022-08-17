const {request} = require("express");
const asyncHandler = require("express-async-handler");

const Source = require('../models/sourceModel');
const User = require('../models/userModel')

// @desc    Get Sources
// @route   GET /api/sources
// @access  Private
const getSources = asyncHandler(async (req, res) => {

    const sources = await Source.find({user : req.user.id});

    res.status(200).json({sources});
})

// @desc    Set a source
// @route   POST /api/sources
// @access  Private
//TODO: Update sourceSchema to mandatory user field and add user field
const setSource = asyncHandler(async (req, res) => {
    
    if(!(req.body.title && req.body.language))
    {
        res.status(400);
        throw new Error("Invalid Source Params");
    }

    const newSource = await Source.create({
        user : req.user.id,
        title : req.body.title,
        language : req.body.language
    })

    res.status(201).json(newSource);

})

// @desc    Update a Source
// @route   PUT /api/sources/:id
// @access  Private
const updateSource = asyncHandler(async (req, res) => {
    
    const source = await Source.findById(req.params.id);

    if(!source)
    {
        res.status(400);
        throw new Error("Source not found");
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(source.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedSource = await Source.findByIdAndUpdate(req.params.id, req.body, { new : true});

    res.status(200).json(updatedSource);
})

// @desc    Delete a Source
// @route   DELETE /api/sources/:id
// @access  Private
const deleteSource = asyncHandler(async (req, res) => {
    
    const source = await Source.findById(req.params.id);

    if(!source)
        {
            res.status(400);
            throw new Error("Source not found");
        }

        const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(source.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await source.remove();
    res.status(200).json({id : req.params.id});

})

module.exports = {
    getSources,
    setSource,
    updateSource,
    deleteSource
}