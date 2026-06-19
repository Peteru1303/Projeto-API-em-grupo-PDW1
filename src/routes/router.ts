import { Router, Request, Response } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { CarroController } from '../controllers/carroController'
import { EstoqueController } from '../controllers/estoqueController'
import { VendedorController } from '../controllers/vendedorController'
import { NotaFiscalController } from '../controllers/notaFiscalController'

const router = Router();
const Clientecontroller = new ClienteController();
const estoquecontroller = new EstoqueController();
const vendedorController = new VendedorController();
const carroController = new CarroController();
const notaFiscalController = new NotaFiscalController();

// Clientes
router.get('/clientes', (req: Request, res: Response) => { Clientecontroller.listarCliente(req, res); });

router.get('/clientes/:id', (req: Request, res: Response) => { Clientecontroller.buscaClientePorID(req, res); });

router.post('/clientes', (req: Request, res: Response) => { Clientecontroller.cadastraCiente(req, res); });

router.put('/clientes/:id', (req: Request, res: Response) => { Clientecontroller.atualizarCliente(req, res); });

router.delete('/clientes/:id', (req: Request, res: Response) => { Clientecontroller.removerCliente(req, res); });

router.get('/clientes/notas/:id', (req: Request, res: Response) => { Clientecontroller.listarTodasNotasFiscaisCliente(req, res); });


//Carro

router.get('/carros', (req: Request, res: Response) => { carroController.listarCarro(req, res); });

router.get('/carros/:id', (req: Request, res: Response) => { carroController.buscaCarroPorID(req, res); });

router.get('/carros/disponiveis', (req: Request, res: Response) => { carroController.listaCarroDisponivel(req, res); });

router.post('/carros', (req: Request, res: Response) => { carroController.cadastraCarro(req, res); });

router.put('/carros/:id', (req: Request, res: Response) => { carroController.atualizarCarroExistente(req, res); });

router.delete('/carros/:id', (req: Request, res: Response) => { carroController.removerCarro(req, res); });


//Vendedor 

router.post('/vendedor', (req: Request, res: Response) => { vendedorController.cadastrarVendedor(req, res); });//OK 1) 

router.get('/vendedor/:id', (req: Request, res: Response) => { vendedorController.buscaVendedorPorID(req, res); });//OK 1)

router.get('/vendedor', (req: Request, res: Response) => { vendedorController.listarVendedores(req, res); });//OK 1)

router.put('/vendedor/:id', (req: Request, res: Response) => { vendedorController.atualizarVendedor(req, res); });//OK 1)

router.delete('/vendedor/:id', (req: Request, res: Response) => { vendedorController.removeVendedor(req, res); });//OK 1)

router.get('/vendedor/notas/:id', (req: Request, res: Response) => { vendedorController.listaTodasNotasFiscaisVendedor(req, res); });//OK 1)

//Estoque 

router.get('/estoque', (req: Request, res: Response) => { estoquecontroller.listarEstoque(req, res); });

router.get('/estoque/:id', (req: Request, res: Response) => { estoquecontroller.buscaEstoquePorID(req, res); });

router.get('/estoque/carro/:id_carro', (req: Request, res: Response) => { estoquecontroller.buscaEstoqueCarro(req, res); });

router.post('/estoque', (req: Request, res: Response) => { estoquecontroller.cadastraEstoque(req, res); });

router.put('/estoque/:id', (req: Request, res: Response) => { estoquecontroller.atualizarEstoque(req, res); });

router.delete('/estoque/:id', (req: Request, res: Response) => { estoquecontroller.removeEstoque(req, res); });

//Nota fiscal

app.get('/notas', (req: Request, res: Response) => { notaFiscalController.listarNotasFiscal(req, res); });

app.get('/notas/:id', (req: Request, res: Response) => { notaFiscalController.buscaNotaFiscaPorID(req, res); });

app.post('/notas', (req: Request, res: Response) => { notaFiscalController.emiteNotaFiscal(req, res); });

export default router;
