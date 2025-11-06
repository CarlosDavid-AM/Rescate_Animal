import db from "../db/db.js";

export const getAllAnimals = async (req, res) => {
  const sql =
    "select id, nombre, especie, edad, estado_salud, fecha_rescate, adoptado, ruta_archivo, ruta_imagen, observaciones from animales;";
  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};
