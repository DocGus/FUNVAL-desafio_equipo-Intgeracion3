import { Router } from 'express';
import {
  traerTodasLasOrdenes, 
  traerUnaOrden,
  crearOrden, 
  actualizarOrden, 
  eliminarOrden 
} from '../controllers/orders.controller';
import { validarOrden } from '../middlewares/orders.middlewares';

const router = Router();

router.get('/', traerTodasLasOrdenes);
router.get('/:id', traerUnaOrden);
router.post('/', validarOrden, crearOrden);
router.put('/:id', validarOrden, actualizarOrden);
router.delete('/:id', eliminarOrden);

export default router;