import { conmysql } from "../db.js";
// Controlador para registrar consumo con geolocalización
export const registrarConsumo = async (req, res) => {
    const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;

    try {
        // Verificar si el med_id existe en la tabla tb_medidor
        const [medidor] = await conmysql.query('SELECT * FROM tb_medidor WHERE med_id = ?', [med_id]);

        if (medidor.length === 0) {
            return res.status(400).json({ message: 'El medidor con ese ID no existe.' });
        }

        // Si el med_id existe, proceder con la inserción del consumo
        const [result] = await conmysql.query(`
            INSERT INTO tb_consumo (med_id, mes, anio, consumo, longitudToma, latitudToma)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [med_id, mes, anio, consumo, longitudToma, latitudToma]);

        res.json({ message: 'Consumo registrado con éxito', consumoId: result.insertId });
    } catch (error) {
        console.error('Error al registrar consumo:', error);
        res.status(500).json({ message: 'Error al registrar el consumo' });
    }
};
export const getMedidores = async (req, res) => {
    try {
      // Consulta para obtener todos los medidores
      const [medidores] = await conmysql.query('SELECT * FROM tb_medidor');
      
      if (medidores.length > 0) {
        return res.status(200).json(medidores); // Retorna los medidores encontrados
      } else {
        return res.status(404).json({ message: 'No se encontraron medidores' });
      }
    } catch (error) {
      console.error('Error al obtener medidores:', error);
      return res.status(500).json({ message: 'Error al obtener medidores' });
    }
  };
