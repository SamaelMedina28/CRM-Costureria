import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { registerRules, loginRules } from "../validations/auth.validations.js";
import { validate } from "../middlewares/validate.js";
import { isAuth } from "../middlewares/isAuth.js";
import type { Request, Response } from "express";
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario en el sistema. El correo electrónico debe ser único.
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroInput'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado correctamente"
 *                 user:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 */
router.post("/register", registerRules, validate, register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica al usuario con correo y contraseña. Devuelve un token JWT almacenado en una cookie httpOnly.
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Se establece la cookie 'token' con el JWT.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
 *             description: Cookie JWT con duración de 1 hora
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Se logueo correctamente"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales invalidas"
 */
router.post("/login", loginRules, validate, login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Elimina la cookie de autenticación del navegador, cerrando la sesión del usuario.
 *     tags: [Autenticación]
 *     security: []
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Se deslogueo correctamente"
 */
router.post("/logout", logout);

router.use(isAuth);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve la información del usuario actualmente autenticado (decodificada del token JWT).
 *     tags: [Autenticación]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario
 *                       example: "665f1a2b3c4d5e6f7a8b9c0d"
 *                     iat:
 *                       type: integer
 *                       description: Timestamp de emisión del token
 *                     exp:
 *                       type: integer
 *                       description: Timestamp de expiración del token
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.get("/profile", (req: Request, res: Response) => {
    res.json({ user: req.user });
});

export default router;