import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/clienteController';

const router = Router();
const controller = new ClienteController();

// Clientes
router.get('/clientes', (req: Request, res: Response) => { controller.listarCliente(req, res); });

router.get('/clientes/:id', (req: Request, res: Response) => { controller.buscaClientePorID(req, res); });

router.post('/clientes', (req: Request, res: Response) => { controller.cadastraCiente(req, res); });

router.put('/clientes/:id', (req: Request, res: Response) => { controller.atualizarCliente(req, res); });

router.delete('/clientes/:id', (req: Request, res: Response) => { controller.removerCliente(req, res); });

router.get('/clientes/notas/:id', (req: Request, res: Response) => { controller.listarTodasNotasFiscaisCliente(req, res); });

export default router;
