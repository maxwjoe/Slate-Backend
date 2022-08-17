const express = require("express");
const router = express.Router();
const {getSources, setSource, updateSource, deleteSource} = require("../controllers/sourceController");
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSources);
router.post('/', protect, setSource);
router.put('/:id', protect, updateSource);
router.delete('/:id', protect, deleteSource);

module.exports = router;
