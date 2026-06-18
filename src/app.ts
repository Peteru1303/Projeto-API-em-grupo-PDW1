import express from "express"
import router from "./routes/router";
app.use('/', router);
import { inicializarBanco } from "./database/mysql";
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

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function logInfo() {
    console.log(`API em execucao na URL: http://localhost:${PORT}`);
}

//Classes já feitas
//Clientes -- OK
//Vendedor -- Router OK, resta repository e controller
//Carro -- Router OK, resta repository e controller
//Estoque -- Router OK, resta repository e controller
//NotaFiscal -- Router OK, resta repository e controller

async function startServer() {
    await inicializarBanco();
    app.listen(PORT, logInfo);
}

startServer();
