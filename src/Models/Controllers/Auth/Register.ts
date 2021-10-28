/*
    UTilities not for loggging for the registration :D 
*/

import databaseConnection from "../../../database/database";
import IUser from "../../Interfaces/IUser";

// beep boop stuff. its 2:15 lets see what happens 

export default class Register{
    
    private _db = databaseConnection;

    public async createUser(profile: IUser): Promise<null | IUser> {
        return new Promise((resolve, reject) => {
            let userExists:string = `
                SELECT COUNT(*) as 'occurances'
                FROM user
                WHERE email = :email;
            `
            let userExistsParams = {email: profile.email}

            databaseConnection.query(userExists, userExistsParams, (err, res) => {
                if(err){reject(err)}
                if(res[0].occurances !=0) {
                        reject("sorry email already being used")
                    }
            })

            let query:string = `
            INSERT into user
            (firstName, lastName, email, salt, is_landlord)
            VALUES
            (:firstName, :lastName, :email, sha2(UUID(), 512), :is_landlord);
            `

            let params = {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                is_landlord: profile.is_landlord,
            }

            databaseConnection.query(query, params, (err, res) =>{
                if(err){reject(err)}

                let query2:string = `
                UPDATE user
                SET password = sha2(concat(:password, salt), 512)
                WHERE user_id = :userId 
                `;
                let param2 = {
                    userId: res.insertId,
                    password: profile.password[0]
                }
                databaseConnection.query(query2, param2, (err, res) => {
                    if(err){reject(err)}
                    resolve(res[0] as IUser) //this might be a problem but im rlly tired and cant think
                })
            })
        })
    }


}