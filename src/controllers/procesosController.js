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

export const saveProcess = async (req, res) => {
  const {
    tipo,
    id_persona,
    id_animal,
    es_nueva_persona,
    observaciones,
    ruta_archivo,
    ruta_imagen,
  } = req.body;

  if (
    !tipo ||
    !id_persona ||
    !id_animal ||
    !es_nueva_persona ||
    !observaciones ||
    !ruta_archivo ||
    !ruta_imagen
  ) {
    return res.status(400).json({ message: "Falta completar los campos" });
  }

  const sql =
    "INSERT INTO procesos (tipo, id_persona, id_animal, es_nueva_persona, observaciones, ruta_archivo, ruta_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.query(sql, [
      tipo,
      id_persona,
      id_animal,
      es_nueva_persona,
      observaciones,
      ruta_archivo,
      ruta_imagen,
    ]);

    res.status(201).json({
      id: result.insertId,
      message: "Registrado correctamente",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
  }
};
