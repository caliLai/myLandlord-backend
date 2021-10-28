"use strict";
/*
    configuration n stuff for authentication using Passport

    for login purposes
*/
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
class PassportConfig {
    constructor() {
        PassportConfig._localStrategy = new passport_local_1.Strategy();
    }
    static serializeUser(user, done) {
        done(null, user.email);
    }
    static deserializeUser(email, done) {
    }
}
exports.default = PassportConfig;
PassportConfig._strategyOptions = {
    usernameField: "email",
    passwordField: "password",
};
//# sourceMappingURL=PassportConfig.js.map