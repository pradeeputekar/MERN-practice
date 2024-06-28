import connectToDatabase from "../db.js";
import sql from "mssql";

export const getAllUsers = async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query("SELECT * FROM TestUsers");
    res.json(result.recordset);
  } catch (e) {
    console.error("SQL query failed", e);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, location, contact, color } = req.body;
    const pool = await connectToDatabase();
    const result = await pool
      .request()
      .query(
        `INSERT INTO TestUsers (name, location, contact, color) VALUES ('${name}','${location}','${contact}','${color}')`
      );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("SQL query failed", err);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const pool = await connectToDatabase();
    await pool.request().query(`DELETE FROM TestUsers WHERE id=${userId}`);
    const result = await pool.request().query("SELECT * FROM TestUsers");
    res.json(result.recordset);
  } catch (error) {
    console.error("SQL query failed", error);
    res.status(500).send("Internal Server Error");
  } finally {
    sql.close();
  }
};
