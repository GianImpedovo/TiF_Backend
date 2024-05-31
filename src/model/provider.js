import { getConnectionUsers } from "../database/connection.js";
import mongoose from 'mongoose';

export class ProviderModel {

    static async getAll() {
        try {
            const db = await getConnectionUsers();
            const data = await db.find().toArray();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getById(id) {
        try {
            const db = await getConnectionUsers();
            const data = await db.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(id) });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    static async create({ input }) {
        try {
            const db = await getConnectionUsers();
            const { insertedId } = await db.insertOne(input);
            const result = await db.findOne({ _id: insertedId });
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    static async update(id, { input }) {
        try {
            const db = await getConnectionUsers();
            const result = await db.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId.createFromHexString(id) },
                { $set: input },
                { returnOriginal: false }
            );
            return result.value;
        } catch (error) {
            console.error(error);
        }
    }

    static async delete(id) {
        try {
            const db = await getConnectionUsers();
            const result = await db.findOneAndDelete({ _id: mongoose.Types.ObjectId.createFromHexString(id) });
            return result.value;
        } catch (error) {
            console.error(error);
        }
    }
}
