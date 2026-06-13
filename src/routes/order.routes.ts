import express from "express";
import { changeStatusOrderValidations, createOrderValidations, updateOrderValidations } from "../validations/order.validations.js"
import { validate } from "../middlewares/validate.js";
import { changeStatus, create, getAll, getById, update, destroy } from "../controllers/order.controller.js";

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todos los pedidos
 *     description: Devuelve una lista de todos los pedidos del usuario autenticado, con información poblada del cliente y las telas que tiene.
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoAutenticado'
 */
router.get("/", getAll)

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     description: Devuelve los datos de un pedido específico con información poblada del cliente y las telas. Solo el propietario del pedido puede verlo.
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c11"
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: No autenticado o no tienes permiso para ver esta orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para ver esta orden"
 *       404:
 *         description: Orden no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden no encontrada"
 */
router.get("/:id", getById)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: |
 *       Crea un nuevo pedido de costura asociado al usuario autenticado.
 *       - **fabricsIHave**: Telas del inventario que se usarán. Al crear el pedido, la cantidad especificada se resta automáticamente del stock.
 *       - **fabricsINeed**: Telas que el costurero/a necesita comprar externamente.
 *       Ambas listas deben tener al menos un elemento.
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearPedidoInput'
 *           example:
 *             client: "665f1a2b3c4d5e6f7a8b9c0e"
 *             fabricsIHave:
 *               - fabric: "665f1a2b3c4d5e6f7a8b9c0f"
 *                 quantity: 3
 *             fabricsINeed:
 *               - name: "Encaje francés"
 *                 color: "Blanco"
 *                 quantity: 2
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden creada correctamente"
 *                 order:
 *                   $ref: '#/components/schemas/Pedido'
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
router.post("/", createOrderValidations, validate, create)

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualizar un pedido
 *     description: Actualiza los datos de un pedido existente (cliente, telas que tiene, telas que necesita).
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c11"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarPedidoInput'
 *     responses:
 *       200:
 *         description: Orden actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden actualizada correctamente"
 *                 order:
 *                   $ref: '#/components/schemas/Pedido'
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
router.put("/:id", updateOrderValidations, validate, update)

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     description: Elimina un pedido existente. Solo el propietario del pedido puede eliminarlo.
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c11"
 *     responses:
 *       200:
 *         description: Orden eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden eliminada correctamente"
 *       401:
 *         description: No tienes permiso para eliminar esta orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para eliminar esta orden"
 *       404:
 *         description: Orden no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden no encontrada"
 */
router.delete("/:id", destroy)

/**
 * @swagger
 * /orders/status/{id}:
 *   post:
 *     summary: Cambiar el estado de un pedido
 *     description: |
 *       Cambia el estado de un pedido. Solo se puede cambiar si el estado actual es **"pending"** (pendiente).
 *
 *       **Reglas de negocio:**
 *       - Si el nuevo estado es **"cancelled"** (cancelado), las cantidades de tela usadas se devuelven automáticamente al stock.
 *       - Si el nuevo estado es **"delievered"** (entregado), el pedido se marca como completado.
 *       - No se puede cambiar el estado de un pedido que ya fue modificado (entregado o cancelado).
 *     tags: [Pedidos]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido (ObjectId de MongoDB)
 *         example: "665f1a2b3c4d5e6f7a8b9c11"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CambiarEstadoInput'
 *     responses:
 *       200:
 *         description: Orden actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden actualizada correctamente"
 *                 order:
 *                   $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: No se puede cambiar el estado de una orden que ya fue modificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se puede cambiar el estado de una orden que ya fue modificada"
 *       401:
 *         description: No tienes permiso para cambiar el estado de esta orden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No tienes permiso para cambiar el estado de esta orden"
 *       404:
 *         description: Orden no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orden no encontrada"
 */
router.post("/status/:id", changeStatusOrderValidations, validate, changeStatus)

export default router;