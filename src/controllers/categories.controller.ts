import type { Request, Response } from "express";
import { categories, category } from "../data/categories.data";


// Traer todas las categorías GET
export const traerTodasCategorias = (req: Request, res: Response): void => {
  res.status(200).json({
    ok: true,
    total: categories.length,
    data: categories,
  });
};

// Traer una categoría GET (no es tan util con tan pocas, pero bueno hhahahah)
export const traerUnaCategoria = (req: Request, res: Response): void => {
  const idBuscando = Number(req.params.id);

  if (isNaN(idBuscando)) {
    res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido" });
    return;
  }

  const categoriaEncontrada = categories.find((cat) => cat.id === idBuscando);

  if (!categoriaEncontrada) {
    res.status(404).json({
      ok: false,
      mensaje: `La categoría con ID ${idBuscando} no existe`,
    });
    return;
  }

  res.status(200).json({
    ok: true,
    data: categoriaEncontrada,
  });
};

// 3. Crear una categoría POST
export const crearCategoria = (req: Request, res: Response): void => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      ok: false,
      mensaje: "Los campos 'name' y 'description' son obligatorios",
    });
    return;
  }

  // Generar ID autoincremental seguro
  const nextId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;

  const nuevaCategoria: category = {
    id: nextId,
    name: name.trim(),
    description: description.trim(),
  };

  categories.push(nuevaCategoria);

  res.status(201).json({
    ok: true,
    mensaje: "Categoría creada con éxito",
    data: nuevaCategoria,
  });
};

// 4. Actualizar una categoría PUT
export const actualizarCategoria = (req: Request, res: Response): void => {
  const idBuscando = Number(req.params.id);

  if (isNaN(idBuscando)) {
    res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido" });
    return;
  }

  const indiceEncontrado = categories.findIndex((cat) => cat.id === idBuscando);

  if (indiceEncontrado === -1) {
    res.status(404).json({
      ok: false,
      mensaje: `La categoría con ID ${idBuscando} no existe`,
    });
    return;
  }

  const { name, description } = req.body;

  if (!name && !description) {
    res.status(400).json({
      ok: false,
      mensaje: "Debes enviar al menos 'name' o 'description' para actualizar",
    });
    return;
  }

  if (name) categories[indiceEncontrado]!.name = name.trim();
  if (description) categories[indiceEncontrado]!.description = description.trim();

  res.status(200).json({
    ok: true,
    mensaje: "Categoría actualizada con éxito",
    data: categories[indiceEncontrado],
  });
};

// 5. Eliminar una categoría DELETE
export const eliminarCategoria = (req: Request, res: Response): void => {
  const idBuscando = Number(req.params.id);

  if (isNaN(idBuscando)) {
    res.status(400).json({ ok: false, mensaje: "El ID debe ser un número válido" });
    return;
  }

  const indiceEncontrado = categories.findIndex((cat) => cat.id === idBuscando);

  if (indiceEncontrado === -1) {
    res.status(404).json({
      ok: false,
      mensaje: `La categoría con ID ${idBuscando} no existe`,
    });
    return;
  }

  const [categoriaEliminada] = categories.splice(indiceEncontrado, 1);

  res.status(200).json({
    ok: true,
    mensaje: "Categoría eliminada con éxito",
    data: categoriaEliminada,
  });
};
