import { conmysql } from "../db.js";

// Controlador para obtener clientes asignados a un trabajador
export const getClientesByTrabajador = async (req, res) => {
    const { tra_cedula } = req.params;
    try {
        const [clientes] = await conmysql.query(`
            SELECT c.cli_cedula, c.cli_nombres, c.cli_apellidos
            FROM tb_cliente c
            JOIN tb_medidor m ON c.cli_cedula = m.cli_cedula
            JOIN tb_rutaasignada r ON m.med_id = r.med_id
            WHERE r.tra_cedula = ? AND c.cli_estado = "A"
        `, [tra_cedula]);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};


