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

export const getProcessById = async (req, res) => {
  const { id } = req.params;
  const sql =
    "select id, tipo, id_persona, id_animal, fecha, es_nueva_persona, observaciones, ruta_archivo, ruta_imagen from procesos WHERE id = ?;";

  try {
    const [procesos] = await db.query(sql, [id]);

    if (procesos.length == 0) {
      return res.status(404).json({ message: "No encontramos el proceso" });
    }

    res.status(200).json(procesos[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
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

export const updateProcess = async (req, res) => {
  const { id } = req.params;

  try {
    const [currentRows] = await db.query(
      "SELECT * FROM procesos WHERE id = ?",
      [id]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({ message: "Proceso no encontrado" });
    }
    const currentProcess = currentRows[0];

    const {
      tipo = currentProcess.tipo,
      id_persona = currentProcess.id_persona,
      id_animal = currentProcess.id_animal,
      es_nueva_persona = currentProcess.es_nueva_persona,
      observaciones = currentProcess.observaciones,
      ruta_archivo = currentProcess.ruta_archivo,
      ruta_imagen = currentProcess.ruta_imagen,
    } = req.body;

    const sql =
      "UPDATE procesos SET tipo = ?, id_persona = ?, id_animal = ?, es_nueva_persona = ?, observaciones = ?, ruta_archivo = ?, ruta_imagen = ? WHERE id = ?";

    await db.query(sql, [
      tipo,
      id_persona,
      id_animal,
      es_nueva_persona,
      observaciones,
      ruta_archivo,
      ruta_imagen,
      id,
    ]);

    res.status(200).json({ message: "Proceso actualizado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
  }
};

export const deleteProcess = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM procesos WHERE id = ?";

  try {
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proceso no encontrado" });
    }

    res.status(200).json({ message: "Proceso eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el proceso" });
  }
};
