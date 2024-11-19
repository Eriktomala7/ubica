import express from 'express';
import {
    getUbicaciones,
    getUbicacionById,
    createUbicacion,
    updateUbicacion,
    deleteUbicacion
} from "../controladores/ubicacionesctrl.js";
const router = express.Router();

// Rutas para obtener ubicaciones
router.get('/ubicaciones', getUbicaciones);
router.get('/ubicaciones/:id', getUbicacionById);

// Rutas para crear, actualizar y eliminar ubicaciones
router.post('/ubicaciones', createUbicacion);
router.put('/ubicaciones/:id', updateUbicacion);
router.delete('/ubicaciones/:id', deleteUbicacion);

export default router;
