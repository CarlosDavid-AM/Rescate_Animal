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

export const updateAnimal = async (req, res) => {
  const { id } = req.params;

  try {
    const [currentRows] = await db.query(
      "SELECT * FROM animales WHERE id = ?",
      [id]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({ message: "Animal no encontrado" });
    }
    const currentAnimal = currentRows[0];

    const {
      nombre = currentAnimal.nombre,
      especie = currentAnimal.especie,
      edad = currentAnimal.edad,
      estado_salud = currentAnimal.estado_salud,
      fecha_rescate = currentAnimal.fecha_rescate,
      adoptado = currentAnimal.adoptado,
      ruta_archivo = currentAnimal.ruta_archivo,
      ruta_imagen = currentAnimal.ruta_imagen,
      observaciones = currentAnimal.observaciones,
    } = req.body;

    const sql =
      "UPDATE animales SET nombre = ?, especie = ?, edad = ?, estado_salud = ?, fecha_rescate = ?, adoptado = ?, ruta_archivo = ?, ruta_imagen = ?, observaciones = ? WHERE id = ?";

    await db.query(sql, [
      nombre,
      especie,
      edad,
      estado_salud,
      fecha_rescate,
      adoptado,
      ruta_archivo,
      ruta_imagen,
      observaciones,
      id,
    ]);

    res.status(200).json({ message: "Animal actualizado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
  }
};

export const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const sqlProcesos = "DELETE FROM procesos WHERE id_animal = ?";
    await connection.query(sqlProcesos, [id]);

    const sqlAnimal = "DELETE FROM animales WHERE id = ?";
    const [result] = await connection.query(sqlAnimal, [id]);

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Animal no encontrado" });
    }

    await connection.commit();
    res.status(200).json({ message: "Animal eliminado correctamente" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el animal" });
  }
};
