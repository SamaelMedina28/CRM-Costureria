import express from "express";
import { createFabricRules, editFabricRules } from "../validations/fabric.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, getAll, getOne, destroy, update } from "../controllers/fabric.controller.js";
const router = express.Router();

/**
 * @swagger
 * /fabrics:
 *   get:
 *     summary: Obtener todas las telas
 *     description: Devuelve una lista de todas las telas del usuario autenticado, ordenadas por fecha de creación (más reciente primero).
 *     tags: [Telas]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de telas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tela'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.get("/", getAll);

/**
 * @swagger
 * /fabrics:
 *   post:
 *     summary: Crear una nueva tela
 *     description: Registra una nueva tela en el inventario del usuario autenticado.
 *     tags: [Telas]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTelaInput'
 *     responses:
 *       201:
 *         description: Tela creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela creada correctamente"
 *                 fabric:
 *                   $ref: '#/components/schemas/Tela'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.post("/", createFabricRules, validate, create);

/**
 * @swagger
 * /fabrics/{id}:
 *   get:
 *     summary: Obtener una tela por ID
 *     description: Devuelve los datos de una tela específica según su ID.
 *     tags: [Telas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tela (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c0f"
 *     responses:
 *       200:
 *         description: Tela encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tela'
 *       404:
 *         description: Tela no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela no encontrada"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /fabrics/{id}:
 *   put:
 *     summary: Actualizar una tela
 *     description: Actualiza los datos de una tela existente. Solo el propietario de la tela puede actualizarla.
 *     tags: [Telas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tela (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c0f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarTelaInput'
 *     responses:
 *       200:
 *         description: Tela actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela actualizada correctamente"
 *                 fabric:
 *                   $ref: '#/components/schemas/Tela'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 *       403:
 *         description: No tienes permiso para actualizar esta tela
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para actualizar esta tela"
 *       404:
 *         description: Tela no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela no encontrada"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.put("/:id", editFabricRules, validate, update);

/**
 * @swagger
 * /fabrics/{id}:
 *   delete:
 *     summary: Eliminar una tela
 *     description: Elimina una tela del inventario. Solo el propietario de la tela puede eliminarla.
 *     tags: [Telas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tela (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c0f"
 *     responses:
 *       200:
 *         description: Tela eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela eliminada correctamente"
 *       403:
 *         description: No tienes permiso para eliminar esta tela
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para eliminar esta tela"
 *       404:
 *         description: Tela no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tela no encontrada"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.delete("/:id", destroy);


export default router;