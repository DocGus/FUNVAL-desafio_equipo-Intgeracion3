import type { Response, Request } from "express";
import type { OrderItem } from "../models/OrderItem.ts";
import {  orderItems } from "../data/orderItems.data";
import { orders } from "../data/orders.data.js";

let idCounter = orderItems.length > 0 ? Math.max(...orderItems.map(e => e.id ?? 0)) + 1 : 1;

export function traerTodasLasDetallesDeOrdenes(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "La lista de todas las ordenes",
    data: orderItems,
  });
}

export function traerUnDetalleDeOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let ordenEncontrada = orderItems.find(
    (e: OrderItem) => e.id === idBuscado,
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

    export function crearDetalleDeOrden(req: Request, res: Response) {
  const { orderId, productId, quantity, subtotal } = req.body;

  const nuevoDetalle: OrderItem = {
    id: idCounter++,
    orderId: orderId,
    productId: productId,
    quantity: quantity,
    subtotal: subtotal,
  };

  orderItems.push(nuevoDetalle);

  return res.status(201).json({
    ok: true,
    mensaje: "Orden creada con éxito",
    data: nuevoDetalle,
  });
}

export function actualizarDetallesDeOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = orderItems.findIndex(
    (e: OrderItem) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "La orden que deseas actualizar NO EXISTE",
    });
  }

  const { orderId, productId, quantity, subtotal } = req.body;
  const actual = orderItems[indiceEncontrado];

  orderItems[indiceEncontrado] = {
    id: idBuscado,
    orderId: orderId ?? actual?.orderId,
    productId: productId ?? actual?.productId,
    quantity: quantity ?? actual?.quantity,
    subtotal: subtotal ?? actual?.subtotal,
  };

  return res.status(200).json({
    ok: true,
    mensaje: "Orden actualizada con éxito",
    data: orderItems[indiceEncontrado],
  });
}

export function eliminarOrden(req: Request, res: Response) {
  let idBuscado = Number(req.params.id);
  let indiceEncontrado = orderItems.findIndex(
    (e: OrderItem) => e.id === idBuscado
  );

  if (indiceEncontrado === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: "La orden que deseas eliminar NO EXISTE",
    });
  }

  orderItems.splice(indiceEncontrado, 1);

  return res.status(200).json({
    ok: true,
    mensaje: "Orden eliminada con éxito",
  });
}