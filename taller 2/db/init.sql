CREATE TABLE IF NOT EXISTS mensajes (
  id SERIAL PRIMARY KEY,
  texto VARCHAR(200) NOT NULL,
  creado TIMESTAMP DEFAULT NOW()
);
INSERT INTO mensajes (texto) VALUES ('Hola desde PostgreSQL');