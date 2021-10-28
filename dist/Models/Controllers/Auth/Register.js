"use strict";
/*
    UTilities not for loggging for the registration :D
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../../database/database"));
// beep boop stuff. its 2:15 lets see what happens 
class Register {
    constructor() {
        this._db = database_1.default;
    }
    async createUser(profile) {
        return new Promise((resolve, reject) => {
            let userExists = `
                SELECT COUNT(*) as 'occurances'
                FROM user
                WHERE email = :email;
            `;
            let userExistsParams = { email: profile.email };
            database_1.default.query(userExists, userExistsParams, (err, res) => {
                if (err) {
                    reject(err);
                }
                if (res[0].occurances != 0) {
                    reject("sorry email already being used");
                }
            });
            let query = `
            INSERT into user
            (firstName, lastName, email, salt, is_landlord)
            VALUES
            (:firstName, :lastName, :email, sha2(UUID(), 512), :is_landlord);
            `;
            let params = {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                is_landlord: profile.is_landlord,
            };
            database_1.default.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                let query2 = `
                UPDATE user
                SET password = sha2(concat(:password, salt), 512)
                WHERE user_id = :userId 
                `;
                let param2 = {
                    userId: res.insertId,
                    password: profile.password[0]
                };
                database_1.default.query(query2, param2, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res[0]); //this might be a problem but im rlly tired and cant think
                });
            });
        });
    }
}
exports.default = Register;
//# sourceMappingURL=Register.js.map