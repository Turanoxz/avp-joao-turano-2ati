# API de Catálogo de Animes

Projeto da AV1 de Desenvolvimento de Websites — API REST feita com **Node.js** e
**Express**, simulando um catálogo de animes com armazenamento temporário em
memória (os dados existem apenas enquanto o servidor está rodando).

## Tema

Cadastro de animes: cada registro representa um anime, com título, gênero,
número de temporadas, número de episódios, status (assistindo / completo /
planejo assistir), nota e sinopse.

## Como rodar o projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o servidor
npm start

# (opcional, com reinício automático ao salvar arquivos)
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## Rotas disponíveis

| Método | Rota            | Descrição                              |
|--------|-----------------|-----------------------------------------|
| POST   | /animes         | Cadastra um novo anime                  |
| GET    | /animes         | Lista todos os animes cadastrados       |
| GET    | /animes/:id     | Consulta um anime específico pelo ID    |
| PUT    | /animes/:id     | Edita um anime existente pelo ID        |
| DELETE | /animes/:id     | Remove um anime pelo ID                 |

### Exemplo de corpo (JSON) para POST/PUT

```json
{
  "titulo": "Demon Slayer",
  "genero": "Ação",
  "temporadas": 4,
  "episodios": 55,
  "status": "assistindo",
  "nota": 9.2,
  "sinopse": "Tanjiro luta contra demônios para curar sua irmã."
}
```

Campos obrigatórios no cadastro: `titulo` e `genero`. Os demais são opcionais
e recebem valores padrão se não forem enviados.

## Testando com Insomnia/Postman

1. Crie uma requisição `GET http://localhost:3000/animes` para listar os animes
   iniciais (o projeto já vem com 2 animes de exemplo).
2. Crie uma requisição `POST http://localhost:3000/animes` com um corpo JSON
   (aba Body > JSON) para cadastrar um novo anime.
3. Copie o `id` retornado e use em `GET`, `PUT` e `DELETE` em
   `http://localhost:3000/animes/:id` para consultar, editar e excluir.

## Estrutura do projeto

```
avp-joao-turano-2ati/
├── data/
│   └── animes.js       # lista de animes em memória
├── routes/
│   └── animes.js        # rotas do CRUD
├── server.js             # ponto de entrada da aplicação
├── package.json
└── README.md
```

## Próximas etapas (AV2)

Na AV2 o projeto será evoluído com cadastro de usuários, login, criptografia
de senhas, proteção de rotas por middleware, upload de arquivos (ex: capa do
anime) e documentação da API com Swagger.
