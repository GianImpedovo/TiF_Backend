import { ProviderModel } from "../model/provider.js";
import { validateProvider } from "../schema/provider.js";

export class ProviderController {

    static async getAll(req, res) {
        const result = await ProviderModel.getAll();
        res.json(result);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const result = await ProviderModel.getById(id);
        res.json(result);
    }

    static async create(req, res) {
        const result = validateProvider(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }
        const newProvider = await ProviderModel.create({ input: result.data });
        res.status(201).json(newProvider);
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const result = validateProvider(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error});
            }
            const updatedProvider = await ProviderModel.update(id, { input: result.data });
            if (!updatedProvider) {
                return res.status(404).json({ error: "Proveedor no encontrado" });
            }
            res.json(updatedProvider);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedProvider = await ProviderModel.delete(id);
            if (!deletedProvider) {
                return res.status(404).json({ error: "Proveedor no encontrado" });
            }
            res.json(deletedProvider);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}