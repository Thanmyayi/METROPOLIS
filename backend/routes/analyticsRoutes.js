const express = require("express");

const router = express.Router();

const {
    getAnalytics,
    getAnalyticsSummary
} = require("../controllers/analyticsController");

// GET all analytics
router.get("/", getAnalytics);

// GET analytics summary
router.get("/summary", getAnalyticsSummary);

module.exports = router;