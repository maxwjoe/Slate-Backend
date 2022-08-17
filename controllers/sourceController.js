const {request} = require("express");
const asyncHandler = require("express-async-handler");

const Source = require('../models/sourceModel');

// @desc    Get Sources
// @route   GET /api/sources
// @access  Private
const getSources = asyncHandler(async (req, res) => {

    const sources = await Source.find();

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
        title : req.body.title,
        language : req.body.language
    })

    res.status(201).json(newSource);

})

// @desc    Update a Source
// @route   PUT /api/sources/:id
// @access  Private
const updateSource = asyncHandler(async (req, res) => {
    
})

// @desc    Delete a Source
// @route   DELETE /api/sources/:id
// @access  Private
const deleteSource = asyncHandler(async (req, res) => {
    
})

module.exports = {
    getSources,
    setSource,
    updateSource,
    deleteSource
}