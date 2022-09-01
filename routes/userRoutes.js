const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrUser, updateUser} = require('../controllers/userController');
const {protect} = require("../middleware/authMiddleware")
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

router.use(cors(corsOptions));
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current', protect, getCurrUser)
router.put('/', protect, updateUser)

module.exports = router;