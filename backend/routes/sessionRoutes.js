import express,{Router} from "express"
import { getAllSessions } from "../controllers/session.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get('/allSessions',authMiddleware,getAllSessions)

export default router;