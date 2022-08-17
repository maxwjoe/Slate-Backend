const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrUser} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware")

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrUser)

module.exports = router;