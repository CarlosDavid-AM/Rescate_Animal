-- Eliminar la base si ya existe
DROP DATABASE IF EXISTS hogar_rescate;

-- Crear la base
CREATE DATABASE hogar_rescate;
USE hogar_rescate;

-- Tabla de roles
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

-- Tabla de personas
CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  dni VARCHAR(15) UNIQUE,
  telefono VARCHAR(20),
  direccion VARCHAR(150),
  fecha_registro DATE DEFAULT (CURRENT_DATE),
  id_rol INT,
  ruta_archivo VARCHAR(255),
  ruta_imagen VARCHAR(255),
  FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- Tabla de animales
CREATE TABLE animales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  especie ENUM('Perro', 'Gato', 'Otro') NOT NULL,
  edad ENUM('Cachorro', 'Joven', 'Adulto', 'Viejo') NOT NULL,
  estado_salud ENUM('Sano', 'Enfermo', 'Recuperación') NOT NULL,
  fecha_rescate DATE,
  adoptado BOOLEAN DEFAULT FALSE,
  ruta_archivo VARCHAR(255),
  ruta_imagen VARCHAR(255),
  observaciones TEXT
);

-- Tabla de procesos (rescate o adopción)
CREATE TABLE procesos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Rescate', 'Adopcion') NOT NULL,
  id_persona INT NOT NULL,
  id_animal INT NOT NULL,
  fecha DATE DEFAULT (CURRENT_DATE),
  es_nueva_persona BOOLEAN DEFAULT FALSE,
  observaciones TEXT,
  ruta_archivo VARCHAR(255),
  ruta_imagen VARCHAR(255),
  FOREIGN KEY (id_persona) REFERENCES personas(id),
  FOREIGN KEY (id_animal) REFERENCES animales(id)
);

-- ===============================
-- DATOS FAKE DE EJEMPLO
-- ===============================

-- Roles
INSERT INTO roles (nombre) VALUES
('Empleado'),
('Rescatista'),
('Adoptante');

-- Personas
INSERT INTO personas (nombre, dni, telefono, direccion, id_rol, ruta_archivo, ruta_imagen) VALUES
('Laura Gómez', '12345678', '987654321', 'Av. Siempre Viva 123', 2, '/documentos/laura_gomez.pdf', '/imagenes/personas/laura_gomez.jpg'),
('Carlos Pérez', '87654321', '912345678', 'Calle Luna 45', 3, '/documentos/carlos_perez.pdf', '/imagenes/personas/carlos_perez.jpg'),
('María Torres', '11223344', '999888777', 'Calle Sol 789', 1, '/documentos/maria_torres.pdf', '/imagenes/personas/maria_torres.jpg'),
('Pedro Sánchez', '55667788', '988777666', 'Av. Libertad 234', 2, '/documentos/pedro_sanchez.pdf', '/imagenes/personas/pedro_sanchez.jpg'),
('Ana Martínez', '99887766', '977666555', 'Calle Esperanza 567', 3, '/documentos/ana_martinez.pdf', '/imagenes/personas/ana_martinez.jpg');

-- Animales
INSERT INTO animales (nombre, especie, edad, estado_salud, fecha_rescate, adoptado, ruta_archivo, ruta_imagen, observaciones) VALUES
('Firulais', 'Perro', 'Adulto', 'Sano', '2025-10-15', TRUE, '/archivos/firulais_historial.txt', '/imagenes/animales/firulais.jpg', 'Fue rescatado de la calle y adoptado.'),
('Misu', 'Gato', 'Joven', 'Recuperación', '2025-09-20', FALSE, '/archivos/misu_historial.txt', '/imagenes/animales/misu.jpg', 'Aún en tratamiento.'),
('Rocky', 'Perro', 'Viejo', 'Enfermo', '2025-08-10', FALSE, '/archivos/rocky_historial.txt', '/imagenes/animales/rocky.jpg', 'Problemas de visión.'),
('Luna', 'Gato', 'Cachorro', 'Sano', '2025-11-01', FALSE, '/archivos/luna_historial.txt', '/imagenes/animales/luna.jpg', 'Gatita muy juguetona.'),
('Max', 'Perro', 'Joven', 'Sano', '2025-10-25', TRUE, '/archivos/max_historial.txt', '/imagenes/animales/max.jpg', 'Adoptado recientemente.');

-- Procesos
INSERT INTO procesos (tipo, id_persona, id_animal, fecha, es_nueva_persona, observaciones, ruta_archivo, ruta_imagen) VALUES
('Rescate', 1, 1, '2025-10-15', FALSE, 'Laura rescató a Firulais.', '/procesos/rescate_firulais.pdf', '/imagenes/procesos/rescate_firulais.jpg'),
('Adopcion', 2, 1, '2025-10-20', TRUE, 'Carlos adoptó a Firulais (nuevo adoptante).', '/procesos/adopcion_firulais.pdf', '/imagenes/procesos/adopcion_firulais.jpg'),
('Adopcion', 3, 2, '2025-10-22', FALSE, 'María adoptó a Misu (empleada del refugio).', '/procesos/adopcion_misu.pdf', '/imagenes/procesos/adopcion_misu.jpg'),
('Rescate', 4, 4, '2025-11-01', FALSE, 'Pedro rescató a Luna de un parque.', '/procesos/rescate_luna.pdf', '/imagenes/procesos/rescate_luna.jpg'),
('Adopcion', 5, 5, '2025-10-28', TRUE, 'Ana adoptó a Max.', '/procesos/adopcion_max.pdf', '/imagenes/procesos/adopcion_max.jpg');

select * from personas;
select id, nombre, telefono, direccion, fecha_registro, id_rol, ruta_archivo, ruta_imagen from personas;