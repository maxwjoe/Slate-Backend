const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrUser, updateUser} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware")

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrUser)
router.put('/', protect, updateUser)

module.exports = router;