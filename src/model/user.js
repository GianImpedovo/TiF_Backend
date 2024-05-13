import { getConnectionUsers } from "../database/conecction.js";

export class UserModel {

    static async getAll(){
        try {
            const dbUsers = await getConnectionUsers();
            const data = await dbUsers.find().toArray()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static async getById(id){
        try {
            const dbUsers = await getConnectionUsers();
            const data = await dbUsers.findOne({_id: id})
            return data
        } catch (error) {
            console.log(error)
        }
    }

    static async create({input}){
        const dbUsers = await getConnectionUsers();
        const {insertedId} = await dbUsers.insertOne({
            ...input
        })
        const result = await dbUsers.findOne({_id: insertedId})
        return result
    }

}