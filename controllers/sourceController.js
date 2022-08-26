const {request} = require("express");
const asyncHandler = require("express-async-handler");

const Source = require('../models/sourceModel');
const User = require('../models/userModel')
const List = require('../models/listModel')
const Article = require('../models/articleModel');
const Item = require('../models/itemModel')

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

    const user_id = req.user.id;

    if(source.user.toString() !== user_id)
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
    
    // Get source, all lists, articles and items
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
    
    // Find all the lists
    const lists = await List.find({source : source._id});

    // Delete all the lists
    await List.deleteMany({source : source._id});

    // Delete all the articles
    await Article.deleteMany({source : source._id});
    
    // Delete all the items in each list that was found
    for(let i = 0 ; lists && i < lists.length; i++)
    {
        await Item.deleteMany({list : lists[i]._id})
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