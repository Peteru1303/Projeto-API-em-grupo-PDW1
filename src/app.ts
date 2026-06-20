import express from "express"
import { inicializarBanco } from "./database/mysql";
const app = express()
import router from "./routes/router";
const PORT = process.env.PORT ?? 3000
app.use(express.json())
app.use('/', router);

function logInfo() {
    console.log(`API em execucao na URL: http://localhost:${PORT}`);
}

//Classes já feitas
//Clientes -- OK
//Vendedor -- OK
//Carro -- OK
//Estoque -- OK
//NotaFiscal -- Router OK, resta repository e controller

async function startServer() {
    await inicializarBanco();
    app.listen(PORT, logInfo);
}

startServer();