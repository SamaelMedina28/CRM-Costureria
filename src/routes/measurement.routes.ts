import express from "express";
import { createMeasurementRules, editMeasurementRules } from "../validations/measurement.validations.js";
import { validate } from "../middlewares/validate.js";
import { create, destroy, getAll, getOne, update } from "../controllers/measurement.controller.js";
const router = express.Router();

/**
 * @swagger
 * /measurements:
 *   get:
 *     summary: Obtener todas las medidas
 *     description: Devuelve una lista de todas las fichas de medidas corporales del usuario autenticado.
 *     tags: [Medidas]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de medidas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medida'
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
 * /measurements/{id}:
 *   get:
 *     summary: Obtener una medida por ID
 *     description: Devuelve los datos de una ficha de medidas específica. Solo el propietario puede acceder a ella.
 *     tags: [Medidas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la medida (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c10"
 *     responses:
 *       200:
 *         description: Medida encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 measurement:
 *                   $ref: '#/components/schemas/Medida'
 *       403:
 *         description: No tienes permiso para ver esta medida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para ver esta medida"
 *       404:
 *         description: Medida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medida no encontrada"
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
 * /measurements:
 *   post:
 *     summary: Crear una nueva ficha de medidas
 *     description: Crea una nueva ficha de medidas corporales para un cliente. Solo el nombre del cliente es requerido, todas las medidas son opcionales.
 *     tags: [Medidas]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearMedidaInput'
 *     responses:
 *       201:
 *         description: Medidas creadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medidas creadas correctamente"
 *                 measurement:
 *                   $ref: '#/components/schemas/Medida'
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
router.post("/", createMeasurementRules, validate, create);

/**
 * @swagger
 * /measurements/{id}:
 *   put:
 *     summary: Actualizar una ficha de medidas
 *     description: Actualiza los datos de una ficha de medidas existente. Solo el propietario puede actualizarla.
 *     tags: [Medidas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la medida (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c10"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarMedidaInput'
 *     responses:
 *       200:
 *         description: Medidas actualizadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medidas actualizadas correctamente"
 *                 measurement:
 *                   $ref: '#/components/schemas/Medida'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 *       403:
 *         description: No tienes permiso para ver esta medida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para ver esta medida"
 *       404:
 *         description: Medida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medida no encontrada"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.put("/:id", editMeasurementRules, validate, update);

/**
 * @swagger
 * /measurements/{id}:
 *   delete:
 *     summary: Eliminar una ficha de medidas
 *     description: Elimina una ficha de medidas existente. Solo el propietario puede eliminarla.
 *     tags: [Medidas]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la medida (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c10"
 *     responses:
 *       200:
 *         description: Medida eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medida eliminada correctamente"
 *       403:
 *         description: No tienes permiso para eliminar esta medida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para eliminar esta medida"
 *       404:
 *         description: Medida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medida no encontrada"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.delete("/:id", destroy);


export default router;