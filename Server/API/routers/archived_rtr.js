const express = require('express')
const Archive = require('../controllers/archive_ctrl')
const router = express.Router()

router.post('/addArchive', Archive.addArchive);

module.exports = router