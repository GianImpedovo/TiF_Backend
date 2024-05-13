import { UserModel } from "../model/user.js";
import { validateUser } from "../schema/user.js";

export class UserController {

    static async getAll (req, res){
        const result = await UserModel.getAll()
        res.json(result)
    }

    static async getById(req, res){
        const { id } = req.params
        const numId = parseInt(id)
        const result = await UserModel.getById(numId)
        res.json(result)
    }

    static async create(req, res){
        const result = validateUser(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newUser = await UserModel.create({input: result.data})
        res.status(201).json(newUser)
    }

    static async update(req, res){
        
    }

    static async delete(req, res){
        
    }
}