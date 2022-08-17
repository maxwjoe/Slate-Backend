const express = require("express");
const router = express.Router();
const {setList, updateList, deleteList, getLists, getListsBySource} = require("../controllers/listController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getLists);
router.get('/:src', protect, getListsBySource);

router.post('/', protect, setList);
router.put('/:id', protect, updateList);
router.delete('/:id', protect, deleteList);

module.exports = router;
