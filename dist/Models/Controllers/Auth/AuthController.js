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
        this.register = async (req, res, next) => {
            // ALRIGHT WE GOING TO CREATE A ANEW FUCKING USER. 
            let newUser = {
                id: (Date.now() + Math.floor(Math.random() * 10)),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                is_landlord: req.body.is_landlord
            };
            //need to add user to the database but fuck im tired so im going to sleep 
            this._auth_service.createUser(newUser)
                .then((user) => {
                console.log(`${user.email} has been registered`);
                return res.send("EWGW");
            })
                .catch((userExists) => {
                return next(userExists);
            });
        };
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/register`, this.register);
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
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map