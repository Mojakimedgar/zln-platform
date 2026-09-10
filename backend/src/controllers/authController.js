const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.register = async (req, res) => {
  try {
    const {
      full_name,
      whatsapp_number,
      id_number,
      street_address,
      unit_or_stand,
      password
    } = req.body;

    if (
      !full_name ||
      !whatsapp_number ||
      !street_address ||
      !password
    ) {
      return res.status(400).json({
        message: "Please complete all required fields"
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM residents WHERE whatsapp_number = ?",
      [whatsapp_number]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        message: "A resident with this WhatsApp number already exists"
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO residents
      (estate_id, full_name, whatsapp_number, id_number,
       street_address, unit_or_stand, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        1,
        full_name,
        whatsapp_number,
        id_number || null,
        street_address,
        unit_or_stand || null,
        password_hash
      ]
    );

    const residentId = result.insertId;

    const code = String(
      Math.floor(10000 + Math.random() * 90000)
    );

    await pool.query(
      `INSERT INTO visitor_codes
      (resident_id, code)
      VALUES (?, ?)`,
      [residentId, code]
    );

    res.status(201).json({
      message: "Account created successfully",
      residentId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};