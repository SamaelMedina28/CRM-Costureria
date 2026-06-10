import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { registerRules, loginRules } from "../validations/auth.validations.js";
import { validate } from "../middlewares/validate.js";
import { isAuth } from "../middlewares/isAuth.js";
import type { Request, Response } from "express";
const router = express.Router();

router.post("/register", registerRules, validate, register);

router.post("/login", loginRules, validate, login);

router.post("/logout", logout);

router.use(isAuth);

router.get("/profile", (req: Request, res: Response) => {
    res.json({ user: req.user });
});

export default router;