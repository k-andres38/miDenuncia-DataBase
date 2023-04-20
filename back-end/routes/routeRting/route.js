const express = require('express')
const router = express.Router()
const ratingController = require('../../controllers/ratings/createRatingController')


router.post('/rating/:id', ratingController.rating)


module.exports = router // creado por farit