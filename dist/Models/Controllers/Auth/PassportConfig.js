"use strict";
/*
    configuration n stuff for authentication using Passport

    for login purposes
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Login_1 = __importDefault(require("./Login"));
// import IUser from "../../Interfaces/IUser";
class PassportConfig {
    constructor() {
        PassportConfig._login = new Login_1.default();
        console.log("I just need confirmation pls");
        PassportConfig._localStrategy = new passport_local_1.Strategy(PassportConfig._strategyOptions, (email, password, done) => {
            PassportConfig._login.findUserByEmail(email, password)
                .then((user) => {
                console.log(user);
                done(null, user);
            })
                .catch((err) => {
                console.log("is this part even running");
                done(null, false);
            });
        });
        passport_1.default.use(PassportConfig._localStrategy);
        passport_1.default.serializeUser(PassportConfig.serializeUser);
        passport_1.default.deserializeUser(PassportConfig.deserializeUser);
    }
    static serializeUser(user, done) {
        done(null, user.id);
    }
    static async deserializeUser(id, done) {
        console.log("got here");
        PassportConfig._login.findUserById(id)
            .then(user => done(null, user))
            .catch(err => done({ message: "user not found" }, null));
        // try {
        //     const user = await this._login.findUserById(id);
        //     return done(null, user);
        // } catch (error) {
        //   	done({ message: "user not found" }, null);
        // }
    }
}
PassportConfig._strategyOptions = {
    usernameField: "email",
    passwordField: "password",
};
// let config = new PassportConfig();
// export default config;
exports.default = PassportConfig;
//# sourceMappingURL=PassportConfig.js.map