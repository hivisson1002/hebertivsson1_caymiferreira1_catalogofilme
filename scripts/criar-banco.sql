-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS catalogo_filmes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco
USE catalogo_filmes;

-- A tabela será criada automaticamente pelo Sequelize
-- Esta estrutura é apenas para referência
/*
CREATE TABLE IF NOT EXISTS filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    diretor VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    nota DECIMAL(3,1) NULL,
    sinopse TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/
