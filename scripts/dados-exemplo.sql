-- Inserir dados de exemplo
USE catalogo_filmes;

INSERT INTO filmes (titulo, diretor, ano, genero, duracao, nota, sinopse, created_at, updated_at) VALUES
('O Poderoso Chefão', 'Francis Ford Coppola', 1972, 'Drama', 175, 9.2, 'A saga de uma família mafiosa italiana-americana.', NOW(), NOW()),
('Cidade de Deus', 'Fernando Meirelles', 2002, 'Drama', 130, 8.6, 'A história da criminalidade na favela Cidade de Deus.', NOW(), NOW()),
('Tropa de Elite', 'José Padilha', 2007, 'Ação', 118, 8.0, 'A rotina violenta dos policiais do BOPE no Rio de Janeiro.', NOW(), NOW()),
('Central do Brasil', 'Walter Salles', 1998, 'Drama', 110, 8.0, 'Uma professora aposentada ajuda um menino a encontrar o pai.', NOW(), NOW());
