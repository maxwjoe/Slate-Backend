const express = require("express");
const router = express.Router();
const {setItem, updateItem, deleteItem, getItems, getItemsByList} = require("../controllers/listController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getItems);
router.get('/:lst', protect, getItemsByList);

router.post('/', protect, setItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
