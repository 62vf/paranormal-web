const express = require('express')
const router = express.Router()
const caseModel = require('../models/cases.model')
const { createCase, createFiction , getAllCases , getAllFictions , updateCase , deleteCase , updateFiction , deleteFiction} = require('../controllers/case.controller')

router.post('/create-case', createCase)
router.post('/create-fiction', createFiction)
router.get('/cases', getAllCases)
router.get('/fictions', getAllFictions)
router.put('/cases/:id', updateCase)
router.delete('/cases/:id', deleteCase)
router.put('/fictions/:id', updateFiction)
router.delete('/fictions/:id', deleteFiction)


module.exports = router