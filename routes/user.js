const express = require('express')
const router = express.Router();
const { userSignupValidationRules, validate } = require('../validator/index')
const { signup, signin, signout } = require('../controllers/user')

router.post('/signup', userSignupValidationRules(), validate, signup)
router.post('/signin', signin)
router.get('/signout', signout)


module.exports = router;

