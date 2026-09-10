const pool = require("../config/db");

exports.createAlert = async (req, res) => {
  try {
    const {
      resident_id,
      type,
      latitude,
      longitude
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO alerts
      (resident_id, type, latitude, longitude)
      VALUES (?, ?, ?, ?)`,
      [
        resident_id,
        type,
        latitude || null,
        longitude || null
      ]
    );

    res.status(201).json({
      message: "Alert created successfully",
      alertId: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not create alert"
    });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        alerts.*,
        residents.full_name
       FROM alerts
       JOIN residents
         ON alerts.resident_id = residents.id
       ORDER BY alerts.created_at DESC`
    );

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Could not fetch alerts"
    });
  }
};