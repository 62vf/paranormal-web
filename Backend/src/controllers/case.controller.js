const { caseModel, fictionModel } = require('../models/cases.model')
const jwt = require('jsonwebtoken')

function getTokenFromRequest(req) {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null
    return req.cookies?.token || bearerToken
}

async function createCase(req, res) {
    try {
        const token = getTokenFromRequest(req)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Please login first' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const { title, body } = req.body
        const newCase = await caseModel.create({
            title,
            body
        })
        res.status(201).json({
            message: 'Case created successfully',
            case: newCase
        })
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

async function createFiction(req, res) {
    try {
        const token = getTokenFromRequest(req)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Please login first' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { title, body } = req.body
        const newFiction = await fictionModel.create({
            title,
            body
        })
        res.status(201).json({
            message: 'Story created successfully',
            case: newFiction
        })
    }catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

async function getAllCases(req, res) {
    try {
        const cases = await caseModel.find();
        res.status(200).json({ cases });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cases' });
    }
}

async function getAllFictions(req, res) {
    try {
        const fictions = await fictionModel.find();
        res.status(200).json({ fictions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fictions' });
    }
}

async function updateCase(req, res) {
    try {
        const { id } = req.params
        const { title, body } = req.body
        const updatedCase = await caseModel.findByIdAndUpdate(id, {
            title,
            body
        }, { new: true })
        res.status(200).json({
            message: 'Case updated successfully',
            case: updatedCase
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating case' })
    }
}

async function deleteCase(req, res) {
    try {
        const { id } = req.params
        await caseModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'Case deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting case' })
    }
}

async function updateFiction(req, res) {
    try {
        const { id } = req.params
        const { title, body } = req.body
        const updatedFiction = await fictionModel.findByIdAndUpdate(id, {
            title,
            body
        }, { new: true })
        res.status(200).json({
            message: 'Story updated successfully',
            case: updatedFiction
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating story' })
    }
}

async function deleteFiction(req, res) {
    try {
        const { id } = req.params
        await fictionModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'Story deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting story' })
    }
}

module.exports = { createCase, createFiction, getAllCases, getAllFictions, updateCase, deleteCase, updateFiction, deleteFiction }