# API de Catálogo de Animes

Projeto da AV1 e AV2 de Desenvolvimento de Websites — API REST feita com
**Node.js**, **Express**, **bcrypt**, **JWT**, **Multer** e **Swagger**, simulando
um catálogo de animes com armazenamento temporário em memória.

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

Para trocar a chave usada nos tokens, defina a variável `JWT_SECRET` antes de
iniciar o servidor. Sem ela, é usada uma chave padrão para fins didáticos.

## Rotas disponíveis

| Método | Rota            | Descrição                              |
|--------|-----------------|-----------------------------------------|
| POST   | /animes         | Cadastra um novo anime                  |
| GET    | /animes         | Lista todos os animes cadastrados       |
| GET    | /animes/:id     | Consulta um anime específico pelo ID    |
| PUT    | /animes/:id     | Edita um anime existente pelo ID        |
| DELETE | /animes/:id     | Remove um anime pelo ID                 |

Todas as rotas de `/animes` exigem o cabeçalho `Authorization: Bearer TOKEN`.

## AV2: usuários e autenticação

| Método | Rota             | Descrição                       |
|--------|------------------|---------------------------------|
| POST   | /usuarios        | Cadastra um usuário             |
| POST   | /usuarios/login  | Faz login e retorna um token JWT|

Exemplo para cadastro:

```json
{
   "nome": "João",
   "email": "joao@email.com",
   "senha": "123456"
}
```

A senha é armazenada usando bcrypt e nunca é devolvida nas respostas. Depois
do login, envie o token retornado nas rotas protegidas:

```text
Authorization: Bearer SEU_TOKEN
```

## Upload de imagens

| Método | Rota    | Descrição                       |
|--------|---------|---------------------------------|
| POST   | /upload | Envia uma imagem no campo `imagem` |

A rota exige token JWT. São aceitos JPG, JPEG, PNG, GIF e WEBP com tamanho
máximo de 5 MB. Os arquivos são salvos localmente em `uploads/`.

No Insomnia, selecione `Multipart Form`, crie o campo `imagem` como tipo
`File` e selecione o arquivo.

## Swagger

A documentação interativa está disponível em `http://localhost:3000/api-docs`.

No Swagger, use o botão **Authorize** e informe `Bearer SEU_TOKEN` para testar
as rotas protegidas.

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

## Recursos da AV2 implementados

O projeto possui cadastro de usuários, login, criptografia de senhas com
bcrypt, tokens JWT, middleware de proteção, upload validado de imagens e
documentação da API com Swagger.
