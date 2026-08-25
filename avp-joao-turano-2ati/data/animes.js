// "Banco de dados" fictício: lista de animes armazenada em memória.
// Os dados existem apenas enquanto o servidor estiver rodando.

let animes = [
  {
    id: 1,
    titulo: "Attack on Titan",
    genero: "Ação",
    temporadas: 4,
    episodios: 87,
    status: "completo",
    nota: 9.5,
    sinopse: "A humanidade luta pela sobrevivência contra titãs gigantes."
  },
  {
    id: 2,
    titulo: "One Piece",
    genero: "Aventura",
    temporadas: 21,
    episodios: 1100,
    status: "assistindo",
    nota: 9.0,
    sinopse: "Luffy e sua tripulação viajam em busca do tesouro One Piece."
  },
  {
    id: 3,
    titulo: "Jujutsu Kaisen",
    genero: "Ação",
    temporadas: 2,
    episodios: 47,
    status: "completo",
    nota: 9.3,
    sinopse: "Yuji Itadori entra para uma escola de feiticeiros para caçar amaldiçoados após engolir um dedo de Sukuna."
  },
  {
    id: 4,
    titulo: "Amagami SS",
    genero: "Romance",
    temporadas: 1,
    episodios: 25,
    status: "completo",
    nota: 7.8,
    sinopse: "Junichi tenta superar um trauma amoroso vivendo diferentes histórias de romance com garotas da escola."
  },
  {
    id: 5,
    titulo: "ReLIFE",
    genero: "Drama",
    temporadas: 1,
    episodios: 13,
    status: "completo",
    nota: 8.2,
    sinopse: "Um homem de 27 anos recebe uma droga experimental e volta a ter aparência de estudante colegial para recomeçar a vida."
  },
  {
    id: 6,
    titulo: "Demon Slayer",
    genero: "Ação",
    temporadas: 4,
    episodios: 55,
    status: "assistindo",
    nota: 9.1,
    sinopse: "Tanjiro se torna caçador de demônios para curar a irmã transformada em um deles."
  },
  {
    id: 7,
    titulo: "Clannad",
    genero: "Drama",
    temporadas: 2,
    episodios: 46,
    status: "planejo assistir",
    nota: null,
    sinopse: "Tomoya conhece Nagisa e outras garotas com histórias emocionantes durante o colegial."
  }
];

// Controla o próximo ID disponível para novos cadastros.
let proximoId = 8;

function getProximoId() {
  return proximoId++;
}

module.exports = {
  animes,
  getProximoId
};
