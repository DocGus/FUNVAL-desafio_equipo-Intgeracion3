import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { users } from "../data/store";
import type { User } from "../models/User";

// Generar representación pública del usuario
const publicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// GET: Obtener todos los usuarios
export const getUsers = (_req: Request, res: Response) => {
  return res.status(200).json(users.map(publicUser));
};

// GET: Obtener usuario por ID
export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.status(200).json(publicUser(user));
};

// POST: Crear usuario
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !name.trim() ||
    !email.trim() ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: "Nombre, correo y contraseña válida son obligatorios. La contraseña debe tener al menos 8 caracteres.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailExists = users.some(
    (user) => user.email === normalizedEmail
  );

  if (emailExists) {
    return res.status(409).json({
      message: "El correo electrónico ya está registrado",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser: User = {
      id: users.length
        ? Math.max(...users.map((user) => user.id)) + 1
        : 1,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    return res.status(201).json(publicUser(newUser));
  } catch {
    return res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

// PUT: Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { name, email, password } = req.body;

  if (
    name !== undefined &&
    (typeof name !== "string" || !name.trim())
  ) {
    return res.status(400).json({ message: "Nombre inválido" });
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || !email.trim())
  ) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 8)
  ) {
    return res.status(400).json({ message: "Contraseña inválida" });
  }

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = users.some(
      (other) =>
        other.id !== id && other.email === normalizedEmail
    );

    if (emailExists) {
      return res.status(409).json({
        message: "El correo electrónico ya está registrado",
      });
    }

    user.email = normalizedEmail;
  }

  try {
    if (name !== undefined) {
      user.name = name.trim();
    }

    if (password !== undefined) {
      user.passwordHash = await bcrypt.hash(password, 12);
    }

    user.updatedAt = new Date();

    return res.status(200).json(publicUser(user));
  } catch {
    return res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};

// DELETE: Eliminar usuario
export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  users.splice(index, 1);

  return res.status(200).json({
    message: "Usuario eliminado correctamente",
  });
};