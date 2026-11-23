CREATE DATABASE IF NOT EXISTS estoque_filamentos;

USE estoque_filamentos;

CREATE TABLE filamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(50) NOT NULL,
  material VARCHAR(20) NOT NULL,
  cor VARCHAR(30) NOT NULL,
  peso INT NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);

INSERT INTO filamentos (marca, material, cor, peso, preco) VALUES ('Voolt3D', 'PLA', 'Preto', 1000, 89.90);
INSERT INTO filamentos (marca, material, cor, peso, preco) VALUES ('3D Fila', 'PETG', 'Branco', 1000, 99.90);
INSERT INTO filamentos (marca, material, cor, peso, preco) VALUES ('Sethi3D', 'ABS', 'Vermelho', 500, 54.90);
