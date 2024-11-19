import { conmysql } from "../db.js";

// Controlador para obtener todas las ubicaciones
export const getUbicaciones = async (req, res) => {
    try {
        const [ubicaciones] = await conmysql.query('SELECT * FROM ubicaciones');
        res.json(ubicaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ubicaciones' });
    }
};

// Controlador para obtener una ubicación por su ID
export const getUbicacionById = async (req, res) => {
    const { id } = req.params;  // Obtener el id desde los parámetros de la URL
    try {
        const [ubicaciones] = await conmysql.query('SELECT * FROM ubicaciones WHERE id = ?', [id]);
        if (ubicaciones.length === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.json(ubicaciones[0]);  // Devolver solo la ubicación encontrada
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la ubicación' });
    }
};

// Controlador para crear una nueva ubicación con validación
export const createUbicacion = async (req, res) => {
    const { titulo, latitud, longitud, medida } = req.body;
    if (!titulo || !latitud || !longitud || !medida) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await conmysql.query(
            'INSERT INTO ubicaciones (titulo, latitud, longitud, medida) VALUES (?, ?, ?, ?)',
            [titulo, latitud, longitud, medida]
        );
        res.status(201).json({ 
            success: true,
            data: { id: result.insertId, titulo, latitud, longitud, medida },
            message: 'Ubicación creada con éxito' 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para actualizar una ubicación
export const updateUbicacion = async (req, res) => {
    const { id } = req.params;  // Obtener el id desde los parámetros de la URL
    const { titulo, latitud, longitud, medida } = req.body;
    try {
        const [result] = await conmysql.query(
            'UPDATE ubicaciones SET titulo = ?, latitud = ?, longitud = ?, medida = ? WHERE id = ?',
            [titulo, latitud, longitud, medida, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.json({ id, titulo, latitud, longitud, medida });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la ubicación' });
    }
};

// Controlador para eliminar una ubicación
export const deleteUbicacion = async (req, res) => {
    const { id } = req.params;  // Obtener el id desde los parámetros de la URL
    try {
        const [result] = await conmysql.query('DELETE FROM ubicaciones WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.json({ message: 'Ubicación eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la ubicación' });
    }
    
};

