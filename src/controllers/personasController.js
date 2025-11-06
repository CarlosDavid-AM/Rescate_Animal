import db from '../db/db.js';

export const getAllPersonas = async (req, res) => {
  const sql = "select id, nombre, telefono, direccion, fecha_registro, id_rol, ruta_archivo from personas;";
  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};
