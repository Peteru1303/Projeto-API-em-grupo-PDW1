
import {
    listarCliente,
    buscaClientePorID,
    cadastraCiente,
    atualizarCliente,
    removerCliente,
    listarTodasNotasFiscaisCliente
} from "./controllers/clienteController";
import {
    listarVendedor,
    buscaVendedorPorID,
    cadastraVendedor,
    atualizaVendedor,
    removeVendedor,
    listaTodasNotasFiscaisVendedor
} from "./controllers/vendedorController";
import { 
    listarCarro,
    buscaCarroPorID,
    listaCarroDisponivel, 
    cadastraCarro,
    atualizarCarroExistente,
    removerCarro 
 } from "./controllers/carroController";
import { 
    listarEstoque,
    buscaEstoquePorID,
    buscaEstoqueCarro,
    cadastraEstoque,
    atualizarEstoque,
    removeEstoque
 } from "./controllers/estoqueController";
import {
    listarNotasFiscal,
    buscaNotaFiscaPorID,
    emiteNotaFiscal
} from "./controllers/notaFiscalController";

import express from "express"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function logInfo() {
    console.log(`API em execucao na URL: http://localhost:${PORT}`);
}

// cliente
app.get('/clientes', listarCliente);
app.get('/clientes/:id', buscaClientePorID);
app.post('/clientes', cadastraCiente);  
app.put('/clientes/:id', atualizarCliente);
app.delete('/clientes/:id', removerCliente);
app.get('/clientes/notas/:id', listarTodasNotasFiscaisCliente);

// vendedor
app.get('/vendedores', listarVendedor);
app.get('/vendedores/:id', buscaVendedorPorID);
app.post('/vendedores', cadastraVendedor);
app.put('/vendedores/:id', atualizaVendedor);
app.delete('/vendedores/:id', removeVendedor);
app.get('/vendedores/notas/:id', listaTodasNotasFiscaisVendedor);


// carro
app.get('/carros', listarCarro);
app.get('/carros/:id', buscaCarroPorID);
app.get('/carros/disponiveis', listaCarroDisponivel);
app.post('/carros', cadastraCarro);
app.put('/carros/:id', atualizarCarroExistente);
app.delete('/carros/:id', removerCarro);

// estoque
app.get('/estoque', listarEstoque);
app.get('/estoque/:id', buscaEstoquePorID);
app.get('/estoque/carro/:id_carro', buscaEstoqueCarro);
app.post('/estoque', cadastraEstoque);
app.put('/estoque/:id', atualizarEstoque);
app.delete('/estoque/:id', removeEstoque);

// notaFiscal
app.get('/notas', listarNotasFiscal);
app.get('/notas/:id', buscaNotaFiscaPorID);
app.post('/notas', emiteNotaFiscal);

app.listen(PORT, logInfo);
