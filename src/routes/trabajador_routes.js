import { Router } from "express";
import { getTrabajadores } from "../controladores/trabajadorctrl.js";

const router = Router();

// Rutas para trabajadores
router.get("/trabajadores", getTrabajadores);

export default router;
