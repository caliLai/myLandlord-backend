import express from "express";
import session from "express-session";
import * as http from "http";
import passport from "passport";
import cors from "cors";

import PassportConfig from  "./Models/Controllers/Auth/PassportConfig";
import AuthController from "./Models/Controllers/Auth/AuthController";
import ProfileController from "./Models/Controllers/Profile/ProfileController";
import BrowseController from "./Models/Controllers/Browse/BrowseController";

// import path from "path";
// import databaseConnection from "./database/database";


const router = express();
const PORT = process.env.PORT || 3080;
router.use(express.json());

//--------PASSPORT/SESSION STUFF---------//
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite:"none"
    },
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.set('trust proxy', 1);

//------REMOVE BEFORE PRODUCTION ???------//
router.use(cors({
	// origin: "http://localhost:3000",
	// origin: "https://idsp3-mylandlord.herokuapp.com",
	origin: ["https://my-landlord-frontend.vercel.app"],
	credentials: true,
	optionsSuccessStatus: 200,
	exposedHeaders: ['set-cookie']
}));

// router.options('*', cors({credentials: true}));

router.use(function (req, res, next) {

  // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // res.setHeader('Access-Control-Allow-Origin', 'https://idsp3-mylandlord.herokuapp.com');
  res.setHeader('Access-Control-Allow-Origin', 'https://my-landlord-frontend.vercel.app');
// 
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});


new PassportConfig();
//--------------------------------//

//-------ROUTE CONTROLLERS-------------//
const auth = new AuthController();
const profile = new ProfileController();
const browse = new BrowseController();
// router.use(express.static("../build"));
// router.use(express.static(path.join(__dirname,"build")));
router.use("/", auth.router);
router.use("/", profile.router);
router.use("/", browse.router);

router.get("/hi", (req, res) => {
	// console.log(req.user);
	req.user ? res.end(JSON.stringify(true)) : res.end(JSON.stringify(false));
})


const app = http.createServer(router);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
