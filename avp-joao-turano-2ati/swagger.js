import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Catálogo de Animes",
      version: "1.0.0",
      description: "API REST desenvolvida para a AV1 e AV2 de Desenvolvimento de Websites."
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Anime: {
          type: "object",
          required: ["titulo", "genero"],
          properties: {
            id: { type: "integer", example: 1 },
            titulo: { type: "string", example: "Demon Slayer" },
            genero: { type: "string", example: "Ação" },
            temporadas: { type: "integer", example: 4 },
            episodios: { type: "integer", example: 55 },
            status: { type: "string", example: "assistindo" },
            nota: { type: "number", nullable: true, example: 9.2 },
            sinopse: { type: "string", example: "Tanjiro luta contra demônios." }
          }
        }
      }
    },
    paths: {
      "/usuarios": {
        post: {
          summary: "Cadastra um usuário",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "email", "senha"],
                  properties: {
                    nome: { type: "string", example: "João" },
                    email: { type: "string", format: "email", example: "joao@email.com" },
                    senha: { type: "string", format: "password", example: "123456" }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "Usuário cadastrado" }, 400: { description: "Dados inválidos" } }
        }
      },
      "/usuarios/login": {
        post: {
          summary: "Realiza login e retorna um token JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "senha"],
                  properties: {
                    email: { type: "string", format: "email" },
                    senha: { type: "string", format: "password" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "Login realizado" }, 401: { description: "Credenciais inválidas" } }
        }
      },
      "/animes": {
        get: {
          summary: "Lista os animes",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Lista de animes" }, 401: { description: "Não autorizado" } }
        },
        post: {
          summary: "Cadastra um anime",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Anime" } } }
          },
          responses: { 201: { description: "Anime cadastrado" }, 401: { description: "Não autorizado" } }
        }
      },
      "/animes/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        get: {
          summary: "Consulta um anime por ID",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Anime encontrado" }, 404: { description: "Anime não encontrado" } }
        },
        put: {
          summary: "Edita um anime",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { "$ref": "#/components/schemas/Anime" } } }
          },
          responses: { 200: { description: "Anime atualizado" }, 404: { description: "Anime não encontrado" } }
        },
        delete: {
          summary: "Exclui um anime",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Anime removido" }, 404: { description: "Anime não encontrado" } }
        }
      },
      "/upload": {
        post: {
          summary: "Envia uma imagem de capa",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: { imagem: { type: "string", format: "binary" } }
                }
              }
            }
          },
          responses: { 201: { description: "Imagem enviada" }, 400: { description: "Arquivo inválido" } }
        }
      }
    }
  },
  apis: []
};

export default swaggerJSDoc(options);
