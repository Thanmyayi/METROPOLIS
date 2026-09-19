const express = require("express");

const router = express.Router();

const {
    getZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone
} = require("../controllers/zoneController");

// GET all zones
router.get("/", getZones);

// GET zone by ID
router.get("/:id", getZoneById);

// CREATE zone
router.post("/", createZone);

// UPDATE zone
router.put("/:id", updateZone);

// DELETE zone
router.delete("/:id", deleteZone);

module.exports = router;