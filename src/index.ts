import express from "express";
import * as http from "http";
// import path from "path";
import databaseConnection from "./database/database";


const router = express();

router.use(express.static("../build"));
// router.use(express.static(path.join(__dirname,"build")));

router.get("/hi", (req, res) => {
	res.send("hi");
})

router.get("/hey", (req, res) => {
	databaseConnection.query("SELECT * FROM users", (err:Error, res) => {
		if(err){throw err}
		else {
			console.log(res);
		}
	});
	res.send("hey");
})

const app = http.createServer(router);
app.listen(3080, () => console.log("listening on 3080"));
