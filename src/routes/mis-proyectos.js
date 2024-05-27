import { Router } from "express";
import { ProyectoController } from "../controllers/mis-proyectos.js";

export const proyectosRouter = Router()

proyectosRouter.get('/presupuestos', ProyectoController.obtenerPresupuestos)

