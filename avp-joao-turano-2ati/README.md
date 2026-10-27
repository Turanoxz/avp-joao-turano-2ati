# API de Catálogo de Animes

Projeto da AV1 e AV2 de Desenvolvimento de Websites — API REST feita com
**Node.js**, **Express**, **bcrypt**, **JWT**, **Multer** e **Swagger**, simulando
um catálogo de animes com persistência em MySQL usando Prisma ORM 7.

## Tema

Cadastro de animes: cada registro representa um anime, com título, gênero,
número de temporadas, número de episódios, status (assistindo / completo /
planejo assistir), nota e sinopse.

## Como rodar o projeto

```bash
# Execute estes comandos na pasta raiz do repositório
npm install

# Gere o Prisma Client e aplique as migrations
npm run db:generate
npm run db:migrate

# Inicie o servidor
npm start

# (opcional, com reinício automático ao salvar arquivos)
npm run dev
```

O servidor sobe em `http://localhost:3000`.

Configure `DATABASE_URL` e `JWT_SECRET` no arquivo `.env` na raiz do repositório.
Copie `.env.example` para `.env` e substitua `JWT_SECRET` por uma chave aleatória
com pelo menos 32 caracteres. Não compartilhe nem envie o `.env` ao repositório.

Para executar os testes automatizados das validações, use `npm test`.

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
   "senha": "SenhaSegura2026!"
}
```

A senha é recebida como `senha`, transformada com bcrypt e persistida no campo
`senhaHash`; a senha original e o hash nunca são devolvidos nas respostas. O
usuário possui ID UUID (`id`), além das datas `created` e `updated`. Depois do
login, envie o token retornado nas rotas protegidas:

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

## Demonstração com Insomnia/Postman

Não há dados de animes inseridos automaticamente. Depois de iniciar o servidor:

1. Envie `POST http://localhost:3000/usuarios` com o JSON de cadastro acima.
   Tente cadastrar o mesmo e-mail novamente para demonstrar a resposta `409`.
2. Envie `POST http://localhost:3000/usuarios/login` com `email` e `senha`.
   Guarde o token retornado; credenciais incorretas devem responder `401`.
3. Envie `GET http://localhost:3000/animes` sem token e confirme `401`. Depois
   configure `Authorization: Bearer SEU_TOKEN` para as rotas abaixo.
4. Faça `POST /animes` com o JSON de exemplo e guarde o `id` retornado.
5. Demonstre `GET /animes`, `GET /animes/:id`, `PUT /animes/:id` e
   `DELETE /animes/:id`, usando o mesmo ID. Após excluir, a consulta deve
   retornar `404`; campos inválidos devem retornar `400`.

Todos esses dados são gravados no banco MySQL/MariaDB por Prisma e permanecem
após reiniciar o servidor. As rotas CRUD são protegidas por JWT.

## Estrutura do projeto

```
avp-joao-turano-2ati/
├── prisma/               # schema e migrations
├── generated/prisma/     # Prisma Client gerado
├── avp-joao-turano-2ati/
│   ├── config/            # ambiente e configuração de segurança
│   ├── controllers/       # validação de fluxo HTTP e respostas
│   ├── db/                # cliente Prisma compartilhado
│   ├── middleware/        # autenticação e erros
│   ├── models/            # acesso persistente aos dados via Prisma
│   ├── routes/            # declaração dos endpoints
│   ├── utils/             # validações reutilizáveis
│   └── server.js          # ponto de entrada
├── tests/                 # testes automatizados das validações
├── package.json           # dependências e scripts únicos
└── .env                   # configuração local (não versionada)
```

O fluxo MVC separa as rotas (URLs e métodos HTTP), os controllers (regras da
requisição/resposta) e os models (consultas Prisma e persistência).

## Recursos da AV2 implementados

O projeto possui cadastro de usuários, login, criptografia de senhas com
bcrypt, tokens JWT, middleware de proteção, upload validado de imagens e
documentação da API com Swagger.
