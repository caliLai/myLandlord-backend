import mysql2 from "mysql2";

const creds:any = {
	host: "localhost",
    user: "root",
    password: "Avocado_21",
    database: "lab_example",
    multipleStatements: false,
    namedPlaceholders: true
};

const databaseConnection:any = mysql2.createPool(creds);

export default databaseConnection;
