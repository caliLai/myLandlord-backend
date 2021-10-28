"use strict";
/*
    Utilities for logging a user in
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//------ MODULES ------ //
const database_1 = __importDefault(require("../../../database/database"));
// import * as mysql2 from "mysql2/promise";
//------ stuff happens here -----//
class Login {
    constructor() {
        this._db = database_1.default;
    }
    /******
    find users via their email and verifies password. If correct,
    return user

    TODO: add params to prevent injections
    *******/
    // public async findUserByEmail(email:string, password:string):Promise<void> {
    async findUserByEmail(email, password) {
        let query = `SELECT * FROM users WHERE email = :email`;
        let params = { email: email };
        return new Promise((resolve, reject) => {
            database_1.default.query(query, params, (err, res) => {
                if (err) {
                    reject("Something's wrong with MySQL");
                }
                // resolve(results[0]);
                if (!res[0]) {
                    console.log("oof");
                    reject("Username or password incorrect");
                }
                else {
                    if (res[0].password === password) {
                        resolve(res[0]);
                    }
                    console.log("oof");
                    reject("Username or password incorrect");
                }
            });
        });
    }
    async findUserById(id) {
        let query = `SELECT * from users where user_id = :userId`;
        let params = { userId: id };
        return new Promise((resolve, reject) => {
            database_1.default.query(query, params, (err, res) => {
                if (err) {
                    reject("Something's wrong with MySQL");
                }
                if (!res[0]) {
                    reject("User does not exist");
                }
                resolve(res[0]);
            });
        });
    }
}
exports.default = Login;
// let a = new Login();
// a.findUserByEmail("tester@tester.test", "tester").then(e => console.log(e)).catch(e => console.log(e));
// a.findUserById(5).then(e => console.log(e)).catch(e => console.log(e));
//# sourceMappingURL=Login.js.map