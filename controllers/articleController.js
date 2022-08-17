const {request} = require("express");
const asyncHandler = require("express-async-handler");

const Article = require('../models/articleModel');
const Source = require('../models/sourceModel');
const User = require('../models/userModel');

// @desc    Get Articles for a user
// @route   GET /api/articles
// @access  Private
const getArticles = asyncHandler(async (req, res) => {

    const articles = await Article.find({user : req.user.id});

    res.status(200).json({articles});
})

// @desc    Get Articles for a source
// @route   GET /api/articles/:src
// @access  Private
const getArticlesBySource = asyncHandler(async (req, res) => {

    const articles = await Article.find({source : req.params.src, user : req.user.id});

    res.status(200).json({articles});
})

// @desc    Set an Article
// @route   POST /api/articles
// @access  Private
const setArticle = asyncHandler(async (req, res) => {
    
    if(!(req.body.title && req.body.source && req.body.content))
    {
        res.status(400);
        throw new Error("Invalid Article Params");
    }

    const newArticle = await Article.create({
        source : req.body.source,
        user : req.user.id,
        title : req.body.title,
        content : req.body.content
    })

    res.status(201).json(newArticle);
})

// @desc    Update an Article
// @route   PUT /api/articles/:id
// @access  Private
const updateArticle = asyncHandler(async (req, res) => {

    const article = await Article.findById(req.params.id);

    if(!article)
    {
        res.status(400);
        throw new Error("Article not found")
    }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(article.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new : true});

    res.status(200).json(updatedArticle);

})

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private
const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if(!article)
        {
            res.status(400);
            throw new Error("Article not found");
        }

    const user = await User.findById(req.user.id);

    if(!user)
    {
        res.status(401);
        throw new Error("User not found");
    }

    if(article.user.toString() !== user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await article.remove();
    res.status(200).json({id : req.params.id});

})

module.exports = {
    getArticles,
    getArticlesBySource,
    setArticle,
    updateArticle,
    deleteArticle
}