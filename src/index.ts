import express from "express";
import session from "express-session";
import * as http from "http";
import passport from "passport";
import cors from "cors";

import PassportConfig from  "./Models/Controllers/Auth/PassportConfig";
import AuthController from "./Models/Controllers/Auth/AuthController";
import ProfileController from "./Models/Controllers/Profile/ProfileController";

// import path from "path";
// import databaseConnection from "./database/database";


const router = express();
const PORT = process.env.PORT || 3080;
router.use(express.json());

//--------PASSPORT STUFF---------//
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

//------REMOVE BEFORE PRODUCTION------//
router.use(cors({credentials: true}));
router.options('*', cors({credentials: true}));
new PassportConfig();
//--------------------------------//

//-------ROUTE CONTROLLERS-------------//
const auth = new AuthController();
const profile = new ProfileController();

//-------------------------------//

// router.use(express.static("../build"));
// router.use(express.static(path.join(__dirname,"build")));
router.use("/", auth.router);
router.use("/", profile.router);

router.get("/hi", (req, res) => {
	res.send("hi");
})

// sam did this:
// router.get("/fuckyoujeremy", (req, res) => {
// 	console.log(req.headers)
// 	res.send("middle finger emoji")
// })


const app = http.createServer(router);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
