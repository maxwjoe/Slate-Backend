const express = require("express");
const router = express.Router();
const {getSources, setSource, updateSource, deleteSource} = require("../controllers/sourceController");


router.get('/', getSources);
router.post('/', setSource);
router.put('/:id', updateSource);
router.delete('/:id', deleteSource);

module.exports = router;
