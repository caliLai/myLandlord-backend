import express from "express";
import session from "express-session";
import * as http from "http";
import passport from "passport";

import AuthController from "./Models/Controllers/Auth/AuthController";
import PassportConfig from  "./Models/Controllers/Auth/PassportConfig";

// import path from "path";
// import databaseConnection from "./database/database";


const router = express();
const PORT = process.env.PORT || 3080;
router.use(express.json())
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
router.use(passport.initialize());
router.use(passport.session());
new PassportConfig();
// import "./Models/Controllers/Auth/PassportConfig";

const auth = new AuthController();
router.use(express.static("../build"));
// router.use(express.static(path.join(__dirname,"build")));
router.use("/", auth.router);

router.get("/hi", (req, res) => {
	res.send("hi");
})

// router.get("/hey", (req, res) => {
// 	databaseConnection.query("SELECT * FROM users", (err:Error, res) => {
// 		if(err){throw err}
// 		else {
// 			console.log(res);
// 		}
// 	});
// 	res.send("hey");
// })

const app = http.createServer(router);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
