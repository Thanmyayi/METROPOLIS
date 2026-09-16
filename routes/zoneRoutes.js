const express = require("express");

const {
  getAllZones,
  getZoneById,
  getZoneByName,
  createZone,
  updateZone,
  deleteZone,
} = require("../controllers/zoneController");

const router = express.Router();

router.get("/", getAllZones);
router.get("/name/:zoneName", getZoneByName);
router.get("/:id", getZoneById);
router.post("/", createZone);
router.put("/:id", updateZone);
router.delete("/:id", deleteZone);

module.exports = router;