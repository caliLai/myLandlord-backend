import mysql2 from "mysql2";

const creds:any = {
	host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Avocado_21",
    database: process.env.DB_SCHEMA || "lab_example",
    multipleStatements: false,
    namedPlaceholders: true
};

const databaseConnection:any = mysql2.createPool(creds);

export default databaseConnection;
