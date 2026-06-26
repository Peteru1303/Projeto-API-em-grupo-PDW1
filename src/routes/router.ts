import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { CarroController } from '../controllers/carroController'
import { EstoqueController } from '../controllers/estoqueController'
import { VendedorController } from '../controllers/vendedorController'
import { NotaFiscalController } from '../controllers/notaFiscalController'

const router = Router();
const clienteController = new ClienteController();
const estoqueController = new EstoqueController();
const vendedorController = new VendedorController();
const carroController = new CarroController();
const notaFiscalController = new NotaFiscalController();

// Clientes
router.get('/clientes', (req: Request, res: Response) => { clienteController.listarCliente(req, res); });

router.get('/clientes/:id', (req: Request, res: Response) => { clienteController.buscaClientePorID(req, res); });

router.post('/clientes', (req: Request, res: Response) => { clienteController.cadastraCliente(req, res); });

router.put('/clientes/:id', (req: Request, res: Response) => { clienteController.atualizarCliente(req, res); });

router.delete('/clientes/:id', (req: Request, res: Response) => { clienteController.removerCliente(req, res); });

router.get('/clientes/notas/:id', (req: Request, res: Response) => { clienteController.listarTodasNotasFiscaisCliente(req, res); });


//Carro

router.get('/carros', (req: Request, res: Response) => { carroController.listarCarro(req, res); });

router.get('/carros/:id', (req: Request, res: Response) => { carroController.buscaCarroPorID(req, res); });

router.get('/carros/disponiveis', (req: Request, res: Response) => { carroController.listaCarroDisponivel(req, res); });

router.post('/carros', (req: Request, res: Response) => { carroController.cadastraCarro(req, res); });

router.put('/carros/:id', (req: Request, res: Response) => { carroController.atualizarCarroExistente(req, res); });

router.delete('/carros/:id', (req: Request, res: Response) => { carroController.removerCarro(req, res); });


//Vendedor 

router.post('/vendedores', (req: Request, res: Response) => { vendedorController.cadastraVendedor(req, res); });//OK 1) 

router.get('/vendedores/:id', (req: Request, res: Response) => { vendedorController.buscaVendedorPorID(req, res); });//OK 1)

router.get('/vendedores', (req: Request, res: Response) => { vendedorController.listarVendedor(req, res); });//OK 1)

router.put('/vendedores/:id', (req: Request, res: Response) => { vendedorController.atualizaVendedor(req, res); });//OK 1)

router.delete('/vendedores/:id', (req: Request, res: Response) => { vendedorController.removeVendedor(req, res); });//OK 1)

router.get('/vendedores/notas/:id', (req: Request, res: Response) => { vendedorController.listaTodasNotasFiscaisVendedor(req, res); });//OK 1)

//Estoque 

router.get('/estoque', (req: Request, res: Response) => { estoqueController.listarEstoque(req, res); });

router.get('/estoque/:id', (req: Request, res: Response) => { estoqueController.buscaEstoquePorID(req, res); });

router.get('/estoque/carro/:id_carro', (req: Request, res: Response) => { estoqueController.buscaEstoqueCarro(req, res); });

router.post('/estoque', (req: Request, res: Response) => { estoqueController.cadastraEstoque(req, res); });

router.put('/estoque/:id', (req: Request, res: Response) => { estoqueController.atualizarEstoque(req, res); });

router.delete('/estoque/:id', (req: Request, res: Response) => { estoqueController.removeEstoque(req, res); });

//Nota fiscal

router.get('/notas', (req: Request, res: Response) => { notaFiscalController.listarNotasFiscal(req, res); });

router.get('/notas/:id', (req: Request, res: Response) => { notaFiscalController.buscaNotaFiscaPorID(req, res); });

router.post('/notas', (req: Request, res: Response) => { notaFiscalController.emiteNotaFiscal(req, res); });

export default router;