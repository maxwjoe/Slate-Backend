const express = require("express");
const router = express.Router();
const {setArticle, updateArticle, deleteArticle, getArticles, getArticlesBySource} = require("../controllers/articleController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getArticles);
router.get('/:src', protect, getArticlesBySource);

router.post('/', protect, setArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
