import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: false, // set to true if using Azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// Connect to SQL Server
async function connectToDatabase() {
  try {
    let pool = sql.connect(config);
    console.log("Connected to the database successfully!");
    return pool;
  } catch (err) {
    console.error("Database connection failed: ", err);
  }
}

export default connectToDatabase;
