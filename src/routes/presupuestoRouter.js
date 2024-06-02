import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const presupuestoRouter = Router()

presupuestoRouter.get('/', UserController.getAll)
presupuestoRouter.post('/', UserController.create)
presupuestoRouter.get('/:id', UserController.getById)
presupuestoRouter.put('/:id', UserController.update)
presupuestoRouter.delete('/:id', UserController.delete)