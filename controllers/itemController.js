const {request} = require("express");
const asyncHandler = require("express-async-handler");

const User = require('../models/userModel');
const List = require('../models/listModel');
const Item = require('../models/itemModel');


// @desc    Get Items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find({user : req.user.id});
    res.status(200).json({items});
})

// @desc    Get Items by List
// @route   GET /api/items/:list
// @access  Private
const getItemsByList = asyncHandler(async (req, res) => {
    const items = await Item.find({list : req.params.list, user : req.user.id});
    res.status(200).json({items});
})

// @desc    Set an Item
// @route   POST /api/items
// @access  Private
const setItem = asyncHandler(async (req, res) => {
    
    if(!(req.body.title && req.body.list && req.body.definition))
    {
        res.status(400);
        throw new Error("Invalid List Params");
    }

    const newItem = await Item.create({
        list : req.body.list,
        user : req.user.id,
        title : req.body.title,
        definition : req.body.definition,
        pronunciation : req.body.pronunciation ? req.body.pronunciation : ''
    })

    res.status(201).json(newItem);
})

// @desc    Update an Item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if(!item)
    {
        res.status(400);
        throw new Error("item not found")
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(item.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new : true});

    res.status(200).json(updatedItem);
})

// @desc    Delete an Item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if(!item)
    {
        res.status(400);
        throw new Error("item not found")
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(item.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await item.remove();
    res.status(200).json({id : req.params.id});
})

module.exports = {
    getItems,
    getItemsByList,
    setItem,
    updateItem,
    deleteItem
}