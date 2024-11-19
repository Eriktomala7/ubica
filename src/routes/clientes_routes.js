import { Router } from "express";
import { getClientesByTrabajador } from "../controladores/clientesCtrl.js";

const router = Router();

// Armar nuestras rutas

// Rutas para clientes y consumos
router.get("/clientes/:tra_cedula", getClientesByTrabajador);

export default router;
