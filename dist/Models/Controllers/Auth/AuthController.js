"use strict";
// file to handle routing stuff for authentication functions
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
// interface IController {
//   path: string;
//   router: Router;
// }
class AuthController {
    constructor() {
        this.path = "/auth";
        this.router = express_1.default.Router();
        this.router.post(`${this.path}/login`, this.login);
    }
    // callback function for authenticating login
    // refer to http://www.passportjs.org/docs/authenticate/
    // "custom callback" section
    login(req, res, next) {
        passport_1.default.authenticate("local", function (err, user) {
            if (err) {
                return next(err);
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
            });
            return res.send("hiasfasdf");
        })(req, res, next);
        // passport.authenticate('local', function(err, user, info) {
        // 	if (err) { return next(err); }
        // 	console.log(user);
        // 	if (!user) { return res.end("Invalid creds"); }
        // 	req.login(user, function(err) {
        // 		if (err) { return next(err); }
        // 	return res.end("Invalid credentials");
        // 	});
        // })(req, res, next);
    }
    register() {
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map