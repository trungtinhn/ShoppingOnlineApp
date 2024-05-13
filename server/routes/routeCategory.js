const categoryController = require('../controllers/categoryController')

const router = require('express').Router()

router.post('/addCategory', categoryController.addCategory)

module.exports = router