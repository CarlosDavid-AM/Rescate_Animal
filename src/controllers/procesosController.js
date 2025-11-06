import db from "../db/db.js";

export const getAllProcess = async (req, res) => {
  const sql =
    "select id, tipo, id_persona, id_animal, fecha, es_nueva_persona, observaciones, ruta_archivo, ruta_imagen from procesos;";
  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};
