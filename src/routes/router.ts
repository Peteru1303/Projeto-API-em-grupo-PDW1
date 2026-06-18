import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { CarroController } from '../controllers/carroController'
import { EstoqueController } from '../controllers/estoqueController'
import { VendedorController } from '../controllers/vendedorController'
import { NotaFiscalController } from '../controllers/notaFiscalController'

const router = Router();
const controller = new ClienteController();

// Clientes
router.get('/clientes', (req: Request, res: Response) => { controller.listarCliente(req, res); });

router.get('/clientes/:id', (req: Request, res: Response) => { controller.buscaClientePorID(req, res); });

router.post('/clientes', (req: Request, res: Response) => { controller.cadastraCiente(req, res); });

router.put('/clientes/:id', (req: Request, res: Response) => { controller.atualizarCliente(req, res); });

router.delete('/clientes/:id', (req: Request, res: Response) => { controller.removerCliente(req, res); });

router.get('/clientes/notas/:id', (req: Request, res: Response) => { controller.listarTodasNotasFiscaisCliente(req, res); });


//Carro

router.get('/carros', (req: Request, res: Response) => { controller.listarCarro(req, res); });

router.get('/carros/:id', (req: Request, res: Response) => { controller.buscaCarroPorID(req, res); });

router.get('/carros/disponiveis', (req: Request, res: Response) => { controller.listaCarroDisponivel(req, res); });

router.post('/carros', (req: Request, res: Response) => { controller.cadastraCarro(req, res); });

router.put('/carros/:id', (req: Request, res: Response) => { controller.atualizarCarroExistente(req, res); });

router.delete('/carros/:id', (req: Request, res: Response) => { controller.removerCarro(req, res); });


//Vendedor 

router.get('/estoque', (req: Request, res: Response) => { controller.listarEstoque(req, res); });

router.get('/estoque/:id', (req: Request, res: Response) => { controller.buscaEstoquePorID(req, res); });

router.get('/estoque/carro/:id_carro', (req: Request, res: Response) => { controller.buscaEstoqueCarro(req, res); });

router.post('/estoque', (req: Request, res: Response) => { controller.cadastraEstoque(req, res); });

router.put('/estoque/:id', (req: Request, res: Response) => { controller.atualizarEstoque(req, res); });

router.delete('/estoque/:id', (req: Request, res: Response) => { controller.removeEstoque(req, res); });

//Estoque 

app.get('/estoque', (req: Request, res: Response) => { controller.listarEstoque(req, res); });

app.get('/estoque/:id', (req: Request, res: Response) => { controller.buscaEstoquePorID(req, res); });

app.get('/estoque/carro/:id_carro', (req: Request, res: Response) => { controller.buscaEstoqueCarro(req, res); });

app.post('/estoque', (req: Request, res: Response) => { controller.cadastraEstoque(req, res); });

app.put('/estoque/:id', (req: Request, res: Response) => { controller.atualizarEstoque(req, res); });

app.delete('/estoque/:id', (req: Request, res: Response) => { controller.removeEstoque(req, res); });

//Nota fiscal

app.get('/notas', (req: Request, res: Response) => { controller.listarNotasFiscal(req, res); });

app.get('/notas/:id', (req: Request, res: Response) => { controller.buscaNotaFiscaPorID(req, res); });

app.post('/notas', (req: Request, res: Response) => { controller.emiteNotaFiscal(req, res); });

export default router;
