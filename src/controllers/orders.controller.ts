import type { Response, Request } from "express";
import type { Orders } from "../models/Order.ts";
import {  orders } from "../data/orders.data";

let idCounter = orders.length > 0 ? Math.max(...orders.map(e => e.id ?? 0)) + 1 : 1;

export function traerTodasLasOrdenes(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "La lista de todas las ordenes",
    data: orders,
  });
}

export function traerUnaOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let ordenEncontrada = orders.find(
    (e: Orders) => e.id === idBuscado,
  );

  if (!ordenEncontrada) {
    return res.status(404).json({
      ok: false,
      mensaje: "ORDEN NO ENCONTRADA O NO EXISTE",
    });
  }
  
  return res.status(200).json({
    ok: true,
    mensaje: "La orden fue encontrada con exito",
    data: ordenEncontrada,
  });
}

    export function crearOrden(req: Request, res: Response) {
  const { userId, totalAmount, status, date } = req.body;

  const nuevaOrden: Orders = {
    id: idCounter++,
    userId: userId,
    totalAmount: totalAmount,
    status: status,
    date: date,
  };

  orders.push(nuevaOrden);

  return res.status(201).json({
    ok: true,
    mensaje: "Orden creada con éxito",
    data: nuevaOrden,
  });
}

export function actualizarOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = orders.findIndex(
    (e: Orders) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "La orden que deseas actualizar NO EXISTE",
    });
  }

  const { userId, totalAmount, status, date } = req.body;
  const actual = orders[indiceEncontrado];

  orders[indiceEncontrado] = {
    id: idBuscado,
    userId: userId ?? actual?.userId,
    totalAmount: totalAmount ?? actual?.totalAmount,
    status: status ?? actual?.status,
    date: date ?? actual?.date,
  };

  return res.status(200).json({
    ok: true,
    mensaje: "Orden actualizada con éxito",
    data: orders[indiceEncontrado],
  });
}

export function eliminarOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = orders.findIndex(
    (e: Orders) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "La orden que deseas eliminar NO EXISTE",
    });
  }

  orders.splice(indiceEncontrado, 1);

  return res.status(200).json({
    ok: true,
    mensaje: "Orden eliminada con éxito",
  });
}