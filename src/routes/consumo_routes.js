import { Router } from "express";
import { registrarConsumo ,getMedidores} from "../controladores/consumoctrl.js";

const router = Router();
router.post("/consumo", registrarConsumo);
router.get("/medidores", getMedidores);
export default router;