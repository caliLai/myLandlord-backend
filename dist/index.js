"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http = __importStar(require("http"));
const passport_1 = __importDefault(require("passport"));
const AuthController_1 = __importDefault(require("./Models/Controllers/Auth/AuthController"));
const PassportConfig_1 = __importDefault(require("./Models/Controllers/Auth/PassportConfig"));
// import path from "path";
// import databaseConnection from "./database/database";
const router = (0, express_1.default)();
const PORT = process.env.PORT || 3080;
router.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
new PassportConfig_1.default();
// import "./Models/Controllers/Auth/PassportConfig";
const fuck = new AuthController_1.default();
router.use(express_1.default.static("../build"));
// router.use(express.static(path.join(__dirname,"build")));
router.use("/", fuck.router);
router.get("/hi", (req, res) => {
    res.send("hi");
});
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
//# sourceMappingURL=index.js.map