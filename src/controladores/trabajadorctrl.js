import { conmysql } from "../db.js";

// Controlador para obtener trabajadores activos
export const getTrabajadores = async (req, res) => {
    try {
        const [trabajadores] = await conmysql.query('SELECT * FROM tb_trabajador WHERE tra_estado = "A"');
        res.json(trabajadores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener trabajadores' });
    }
};
