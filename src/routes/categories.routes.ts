import { Router } from "express";
import {
  traerTodasCategorias,
  traerUnaCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categories.controller";
import { validateApiKey } from "../middlewares/apiKey.middleware";

const router = Router();

// 1. Obtener todas las categorías (Público)
router.get("/", (req, res, next) => {
  /* 
    #swagger.tags = ['Categorias']
    #swagger.summary = 'Obtener todas las categorías'
    #swagger.description = 'Retorna la lista completa de todas las categorías disponibles en memoria'
  */
  next();
}, traerTodasCategorias);

// 2. Obtener una categoría por ID (Público)
router.get("/:id", (req, res, next) => {
  /* 
    #swagger.tags = ['Categorias']
    #swagger.summary = 'Obtener categoría por ID'
    #swagger.description = 'Busca y retorna una sola categoría según su ID numérico'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la categoría a consultar',
      required: true,
      type: 'integer',
      example: 1
    }
  */
  next();
}, traerUnaCategoria);

// 3. Crear una nueva categoría (Protegido con API Key)
router.post("/", (req, res, next) => {
  /* 
    #swagger.tags = ['Categorias']
    #swagger.summary = 'Crear una categoría'
    #swagger.description = 'Crea y registra una nueva categoría en memoria'
    #swagger.security = [{ "ApiKeyAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos de la nueva categoría',
      required: true,
      schema: {
        name: 'Electrodomésticos',
        description: 'Neveras, lavadoras y microondas'
      }
    }
  */
  next();
}, validateApiKey, crearCategoria);

// 4. Actualizar una categoría existente (Protegido con API Key)
router.put("/:id", (req, res, next) => {
  /* 
    #swagger.tags = ['Categorias']
    #swagger.summary = 'Actualizar una categoría'
    #swagger.description = 'Actualiza el nombre o la descripción de una categoría existente'
    #swagger.security = [{ "ApiKeyAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la categoría a actualizar',
      required: true,
      type: 'integer',
      example: 1
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a modificar',
      required: true,
      schema: {
        name: 'Tecnología Avanzada',
        description: 'Gadgets y computadoras de última generación'
      }
    }
  */
  next();
}, validateApiKey, actualizarCategoria);

// 5. Eliminar una categoría (Protegido con API Key)
router.delete("/:id", (req, res, next) => {
  /* 
    #swagger.tags = ['Categorias']
    #swagger.summary = 'Eliminar una categoría'
    #swagger.description = 'Elimina una categoría del sistema por su ID'
    #swagger.security = [{ "ApiKeyAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la categoría a eliminar',
      required: true,
      type: 'integer',
      example: 1
    }
  */
  next();
}, validateApiKey, eliminarCategoria);

export default router;
