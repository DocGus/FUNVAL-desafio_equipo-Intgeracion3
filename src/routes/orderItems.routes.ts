import { Router } from 'express';
import {
  traerTodasLasDetallesDeOrdenes, 
  traerUnDetalleDeOrden,
  crearDetalleDeOrden, 
  actualizarDetallesDeOrden, 
  eliminarOrden 
} from '../controllers/orderItems.controller';
import { validarDetalleDeOrden } from '../middlewares/orderItems.middleware';

const router = Router();

router.get('/', traerTodasLasDetallesDeOrdenes);
router.get('/:id', traerUnDetalleDeOrden);
router.post('/', validarDetalleDeOrden, crearDetalleDeOrden);
router.put('/:id', validarDetalleDeOrden, actualizarDetallesDeOrden);
router.delete('/:id', eliminarOrden);

export default router;