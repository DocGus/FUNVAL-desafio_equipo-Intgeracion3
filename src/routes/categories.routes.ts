import { Router } from "express";
import {
  traerTodasCategorias,
  traerUnaCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categories.controller";

const router = Router();

// Rutas del CRUD de Categorías
router.get("/", traerTodasCategorias);
router.get("/:id", traerUnaCategoria);
router.post("/", crearCategoria);
router.put("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;
