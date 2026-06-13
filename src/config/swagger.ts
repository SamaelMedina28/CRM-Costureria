import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM Costurería API",
      version: "1.0.0",
      description:
        "API REST para la gestión de un CRM de costurería. Permite administrar usuarios, clientes, telas, medidas y pedidos. Autenticación basada en cookies JWT.",
      contact: {
        name: "Soporte CRM Costurería",
      },
    },
    servers: [
      {
        url: "http://localhost:{port}",
        description: "Servidor de desarrollo",
        variables: {
          port: {
            default: "5173",
          },
        },
      },
    ],
    tags: [
      {
        name: "Autenticación",
        description: "Endpoints de registro, inicio de sesión, cierre de sesión y perfil",
      },
      {
        name: "Clientes",
        description: "Gestión de clientes del costurero/a",
      },
      {
        name: "Telas",
        description: "Gestión del inventario de telas",
      },
      {
        name: "Medidas",
        description: "Gestión de las medidas corporales de los clientes",
      },
      {
        name: "Pedidos",
        description: "Gestión de pedidos de costura",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "Token JWT almacenado en una cookie httpOnly. Se establece al iniciar sesión.",
        },
      },
      schemas: {
        // ─── Usuario ──────────────────────────────────────
        Usuario: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único del usuario (ObjectId de MongoDB)",
              example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            name: {
              type: "string",
              description: "Nombre del usuario",
              example: "María López",
            },
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico del usuario (único)",
              example: "maria@correo.com",
            },
            password: {
              type: "string",
              description: "Contraseña hasheada (no se devuelve en respuestas)",
            },
            clients: {
              type: "array",
              items: { type: "string" },
              description: "Lista de IDs de clientes asociados al usuario",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        RegistroInput: {
          type: "object",
          required: ["name", "email", "password", "passwordConfirmation"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "Nombre del usuario (mínimo 3 caracteres)",
              example: "María López",
            },
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico (debe ser único)",
              example: "maria@correo.com",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Contraseña (mínimo 6 caracteres)",
              example: "miContraseña123",
            },
            passwordConfirmation: {
              type: "string",
              description: "Confirmación de la contraseña (debe coincidir con password)",
              example: "miContraseña123",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico del usuario",
              example: "maria@correo.com",
            },
            password: {
              type: "string",
              description: "Contraseña del usuario",
              example: "miContraseña123",
            },
          },
        },

        // ─── Cliente ──────────────────────────────────────
        Cliente: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único del cliente",
              example: "665f1a2b3c4d5e6f7a8b9c0e",
            },
            user: {
              type: "string",
              description: "ID del usuario propietario",
              example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            name: {
              type: "string",
              description: "Nombre del cliente",
              example: "Ana García",
            },
            reference: {
              type: "string",
              description: "Referencia del cliente (cómo lo conoció, etc.)",
              example: "Recomendación de Juan",
            },
            phone: {
              type: "string",
              maxLength: 15,
              description: "Teléfono del cliente (máximo 15 caracteres)",
              example: "5512345678",
            },
            rating: {
              type: "integer",
              enum: [1, 2, 3, 4, 5],
              description: "Calificación del cliente (1 a 5)",
              example: 4,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        CrearClienteInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "Nombre del cliente (mínimo 3 caracteres)",
              example: "Ana García",
            },
            phone: {
              type: "string",
              pattern: "^[0-9]{10}$",
              description: "Teléfono del cliente (10 dígitos)",
              example: "5512345678",
            },
            reference: {
              type: "string",
              description: "Referencia del cliente",
              example: "Recomendación de Juan",
            },
            rating: {
              type: "integer",
              enum: [1, 2, 3, 4, 5],
              description: "Calificación del cliente (1 a 5)",
              example: 4,
            },
          },
        },
        ActualizarClienteInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description: "Nombre del cliente (mínimo 3 caracteres)",
              example: "Ana García Pérez",
            },
            phone: {
              type: "string",
              pattern: "^[0-9]{10}$",
              description: "Teléfono del cliente (10 dígitos)",
              example: "5598765432",
            },
            reference: {
              type: "string",
              description: "Referencia del cliente",
              example: "Vecina del barrio",
            },
            rating: {
              type: "integer",
              enum: [1, 2, 3, 4, 5],
              description: "Calificación del cliente (1 a 5)",
              example: 5,
            },
          },
        },

        // ─── Tela ─────────────────────────────────────────
        Tela: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único de la tela",
              example: "665f1a2b3c4d5e6f7a8b9c0f",
            },
            user: {
              type: "string",
              description: "ID del usuario propietario",
              example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            name: {
              type: "string",
              description: "Nombre de la tela",
              example: "Algodón Pima",
            },
            price: {
              type: "number",
              description: "Precio de la tela por unidad",
              example: 150.5,
            },
            stock: {
              type: "number",
              description: "Cantidad en stock",
              example: 25,
            },
            color: {
              type: "string",
              description: "Color de la tela",
              example: "Azul marino",
            },
            type: {
              type: "string",
              description: "Tipo de tela (opcional)",
              example: "Algodón",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        CrearTelaInput: {
          type: "object",
          required: ["name", "price", "stock", "color"],
          properties: {
            name: {
              type: "string",
              description: "Nombre de la tela",
              example: "Algodón Pima",
            },
            price: {
              type: "number",
              description: "Precio de la tela",
              example: 150.5,
            },
            stock: {
              type: "number",
              description: "Cantidad en stock",
              example: 25,
            },
            color: {
              type: "string",
              description: "Color de la tela",
              example: "Azul marino",
            },
            type: {
              type: "string",
              description: "Tipo de tela (opcional)",
              example: "Algodón",
            },
          },
        },
        ActualizarTelaInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nombre de la tela",
              example: "Seda Natural",
            },
            price: {
              type: "number",
              description: "Precio de la tela",
              example: 280.0,
            },
            stock: {
              type: "number",
              description: "Cantidad en stock",
              example: 10,
            },
            color: {
              type: "string",
              description: "Color de la tela",
              example: "Rojo",
            },
            type: {
              type: "string",
              description: "Tipo de tela",
              example: "Seda",
            },
          },
        },

        // ─── Medidas ──────────────────────────────────────
        Medida: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único de la medida",
              example: "665f1a2b3c4d5e6f7a8b9c10",
            },
            user: {
              type: "string",
              description: "ID del usuario propietario",
              example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            clientName: {
              type: "string",
              description: "Nombre del cliente al que pertenecen las medidas",
              example: "Ana García",
            },
            height: {
              type: "number",
              description: "Altura en cm",
              example: 165,
            },
            chest: {
              type: "number",
              description: "Pecho / Busto en cm",
              example: 90,
            },
            waist: {
              type: "number",
              description: "Cintura en cm",
              example: 70,
            },
            hips: {
              type: "number",
              description: "Cadera en cm",
              example: 95,
            },
            neck: {
              type: "number",
              description: "Cuello en cm",
              example: 35,
            },
            shoulderWidth: {
              type: "number",
              description: "Ancho de hombros en cm",
              example: 40,
            },
            sleeveLength: {
              type: "number",
              description: "Largo de manga en cm",
              example: 58,
            },
            backLength: {
              type: "number",
              description: "Largo de espalda en cm",
              example: 42,
            },
            armhole: {
              type: "number",
              description: "Sisa / Contorno de sisa en cm",
              example: 44,
            },
            wrist: {
              type: "number",
              description: "Muñeca en cm",
              example: 16,
            },
            thigh: {
              type: "number",
              description: "Muslo en cm",
              example: 55,
            },
            calf: {
              type: "number",
              description: "Pantorrilla en cm",
              example: 36,
            },
            ankle: {
              type: "number",
              description: "Tobillo en cm",
              example: 22,
            },
            otherNotes: {
              type: "string",
              description: "Notas adicionales sobre las medidas",
              example: "Prefiere prendas holgadas",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        CrearMedidaInput: {
          type: "object",
          required: ["clientName"],
          properties: {
            clientName: {
              type: "string",
              description: "Nombre del cliente (requerido)",
              example: "Ana García",
            },
            height: { type: "number", description: "Altura en cm", example: 165 },
            chest: { type: "number", description: "Pecho / Busto en cm", example: 90 },
            waist: { type: "number", description: "Cintura en cm", example: 70 },
            hips: { type: "number", description: "Cadera en cm", example: 95 },
            neck: { type: "number", description: "Cuello en cm", example: 35 },
            shoulderWidth: { type: "number", description: "Ancho de hombros en cm", example: 40 },
            sleeveLength: { type: "number", description: "Largo de manga en cm", example: 58 },
            backLength: { type: "number", description: "Largo de espalda en cm", example: 42 },
            armhole: { type: "number", description: "Sisa en cm", example: 44 },
            wrist: { type: "number", description: "Muñeca en cm", example: 16 },
            thigh: { type: "number", description: "Muslo en cm", example: 55 },
            calf: { type: "number", description: "Pantorrilla en cm", example: 36 },
            ankle: { type: "number", description: "Tobillo en cm", example: 22 },
            otherNotes: { type: "string", description: "Notas adicionales", example: "Prefiere prendas holgadas" },
          },
        },
        ActualizarMedidaInput: {
          type: "object",
          properties: {
            clientName: { type: "string", description: "Nombre del cliente", example: "Ana García Pérez" },
            height: { type: "number", description: "Altura en cm", example: 166 },
            chest: { type: "number", description: "Pecho / Busto en cm", example: 91 },
            waist: { type: "number", description: "Cintura en cm", example: 71 },
            hips: { type: "number", description: "Cadera en cm", example: 96 },
            neck: { type: "number", description: "Cuello en cm", example: 35 },
            shoulderWidth: { type: "number", description: "Ancho de hombros en cm", example: 40 },
            sleeveLength: { type: "number", description: "Largo de manga en cm", example: 59 },
            backLength: { type: "number", description: "Largo de espalda en cm", example: 42 },
            armhole: { type: "number", description: "Sisa en cm", example: 44 },
            wrist: { type: "number", description: "Muñeca en cm", example: 16 },
            thigh: { type: "number", description: "Muslo en cm", example: 55 },
            calf: { type: "number", description: "Pantorrilla en cm", example: 36 },
            ankle: { type: "number", description: "Tobillo en cm", example: 22 },
            otherNotes: { type: "string", description: "Notas adicionales", example: "Ajustar cintura" },
          },
        },

        // ─── Pedido ───────────────────────────────────────
        TelaEnPedido: {
          type: "object",
          required: ["fabric", "quantity"],
          properties: {
            fabric: {
              type: "string",
              description: "ID de la tela (ObjectId)",
              example: "665f1a2b3c4d5e6f7a8b9c0f",
            },
            quantity: {
              type: "integer",
              minimum: 1,
              description: "Cantidad de tela a usar",
              example: 3,
            },
          },
        },
        TelaNecesaria: {
          type: "object",
          required: ["name", "color", "quantity"],
          properties: {
            name: {
              type: "string",
              description: "Nombre de la tela necesaria",
              example: "Encaje francés",
            },
            color: {
              type: "string",
              description: "Color de la tela",
              example: "Blanco",
            },
            quantity: {
              type: "integer",
              minimum: 1,
              description: "Cantidad necesaria",
              example: 2,
            },
          },
        },
        Pedido: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único del pedido",
              example: "665f1a2b3c4d5e6f7a8b9c11",
            },
            user: {
              type: "string",
              description: "ID del usuario propietario",
              example: "665f1a2b3c4d5e6f7a8b9c0d",
            },
            client: {
              type: "string",
              description: "ID del cliente asociado al pedido",
              example: "665f1a2b3c4d5e6f7a8b9c0e",
            },
            fabricsIHave: {
              type: "array",
              description: "Telas que el costurero/a ya tiene en stock para este pedido",
              items: { $ref: "#/components/schemas/TelaEnPedido" },
            },
            fabricsINeed: {
              type: "array",
              description: "Telas que el costurero/a necesita comprar para este pedido",
              items: { $ref: "#/components/schemas/TelaNecesaria" },
            },
            status: {
              type: "string",
              enum: ["pending", "delievered", "cancelled"],
              description: "Estado del pedido: pending (pendiente), delievered (entregado), cancelled (cancelado)",
              example: "pending",
            },
            title: {
              type: "string",
              description: "Titulo del pedido",
              example: "Vestido de novia",
            },
            description: {
              type: "string",
              description: "Descripcion del pedido",
              example: "Vestido de novia de encaje francés",
            },
            deliveryDate: {
              type: "string",
              format: "date",
              description: "Fecha de entrega del pedido",
              example: "2022-12-31",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
        },
        CrearPedidoInput: {
          type: "object",
          required: ["client", "fabricsIHave", "fabricsINeed"],
          properties: {
            client: {
              type: "string",
              description: "ID del cliente (ObjectId)",
              example: "665f1a2b3c4d5e6f7a8b9c0e",
            },
            fabricsIHave: {
              type: "array",
              description: "Telas del inventario que se usarán (mínimo 1)",
              items: { $ref: "#/components/schemas/TelaEnPedido" },
              minItems: 1,
            },
            fabricsINeed: {
              type: "array",
              description: "Telas que se necesitan comprar (mínimo 1)",
              items: { $ref: "#/components/schemas/TelaNecesaria" },
              minItems: 1,
            },
          },
        },
        ActualizarPedidoInput: {
          type: "object",
          properties: {
            client: {
              type: "string",
              description: "ID del cliente (ObjectId)",
              example: "665f1a2b3c4d5e6f7a8b9c0e",
            },
            fabricsIHave: {
              type: "array",
              description: "Telas del inventario que se usarán",
              items: { $ref: "#/components/schemas/TelaEnPedido" },
            },
            fabricsINeed: {
              type: "array",
              description: "Telas que se necesitan comprar",
              items: { $ref: "#/components/schemas/TelaNecesaria" },
            },
          },
        },
        CambiarEstadoInput: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["delievered", "cancelled"],
              description: "Nuevo estado del pedido (solo se puede cambiar si está en 'pending')",
              example: "delievered",
            },
          },
        },

        // ─── Respuestas comunes ───────────────────────────
        ErrorValidacion: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string", example: "field" },
                  value: { type: "string", example: "" },
                  msg: { type: "string", example: "El nombre es requerido" },
                  path: { type: "string", example: "name" },
                  location: { type: "string", example: "body" },
                },
              },
              description: "Lista de errores de validación",
            },
          },
        },
        MensajeRespuesta: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensaje descriptivo de la operación",
              example: "Operación exitosa",
            },
          },
        },
        ErrorNoAutenticado: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "No autenticado",
            },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
