import db from "../db/db.js";

export const getAllPersonas = async (req, res) => {
  const sql =
    "select id, dni, nombre, telefono, direccion, fecha_registro, id_rol, ruta_archivo, ruta_imagen from personas;";
  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const getPersonaById = async (req, res) => {
  const { id } = req.params;
  const sql =
    "select id, dni, nombre, telefono, direccion, fecha_registro, id_rol, ruta_archivo, ruta_imagen from personas WHERE id = ?;";

  try {
    const [personas] = await db.query(sql, [id]);

    if (personas.length == 0) {
      return res.status(404).json({ message: "No encontramos a la personas" });
    }

    res.status(200).json(personas[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error Interno en el Servidor" });
  }
};

export const savePersona = async (req, res) => {
  const {
    nombre,
    dni,
    telefono,
    direccion,
    id_rol,
    ruta_archivo,
    ruta_imagen,
  } = req.body;

  if (
    !nombre ||
    !dni ||
    !telefono ||
    !direccion ||
    !id_rol ||
    !ruta_archivo ||
    !ruta_imagen
  ) {
    return res.status(400).json({ message: "Falta completar los campos" });
  }

  const sql =
    "INSERT INTO personas (nombre, dni, telefono, direccion, id_rol, ruta_archivo, ruta_imagen) VALUES (?, ?, ?, ?, ?, ? ,?)";

  try {
    const [result] = await db.query(sql, [
      nombre,
      dni,
      telefono,
      direccion,
      id_rol,
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
