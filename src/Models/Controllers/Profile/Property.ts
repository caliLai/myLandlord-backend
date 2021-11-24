/*
    utilities for making a properties posting
*/

import databaseConnection from "../../../database/database";
import IProperty from "../../Interfaces/Profile/IProperty";

export default class Property{

    public create(property:IProperty):Promise<string> {
        let query:string = `
        INSERT INTO property
        (
            address,
            city,
            description,
            landlord_id
        )
        VALUES
            (:address,
            :city,
            :description,
            :landlord_id
            );`
        let params = {
            address:property.address,
            city:property.city,
            description:property.description,
            landlord_id:property.landlord_id
        };
        return new Promise((resolve, reject) => {

			databaseConnection.query(query, params, (err) => {
				if(err){reject("Something's wrong with the database")}
				resolve("Property added");
			})
		})
    }
}