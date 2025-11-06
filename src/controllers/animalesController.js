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

export const getAnimalById = async (req, res) => {
  const { id } = req.params;
  const sql =
    "select id, nombre, especie, edad, estado_salud, fecha_rescate, adoptado, ruta_archivo, ruta_imagen, observaciones from animales WHERE id = ?;";

  try {
    const [animales] = await db.query(sql, [id]);

    if (animales.length == 0) {
      return res.status(404).json({ message: "No encontramos al animal" });
    }

    res.status(200).json(animales[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
  }
};

export const saveAnimal = async (req, res) => {
  const {
    nombre,
    especie,
    edad,
    estado_salud,
    fecha_rescate,
    adoptado,
    ruta_archivo,
    ruta_imagen,
    observaciones,
  } = req.body;

  if (
    !nombre ||
    !especie ||
    !edad ||
    !estado_salud ||
    !fecha_rescate ||
    !adoptado ||
    !ruta_archivo ||
    !ruta_imagen ||
    !observaciones
  ) {
    return res.status(400).json({ message: "Falta completar los campos" });
  }

  const sql = `INSERT INTO animales 
  (nombre, especie, edad, estado_salud, fecha_rescate, adoptado, ruta_archivo, ruta_imagen, observaciones) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.query(sql, [
      nombre,
      especie,
      edad,
      estado_salud,
      fecha_rescate,
      adoptado,
      ruta_archivo,
      ruta_imagen,
      observaciones,
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
