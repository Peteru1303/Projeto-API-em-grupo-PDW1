import express from "express"
import { 
    novoProduto, 
    listarProdutos, 
    buscarPorID, 
    atualizarProduto, 
    removerProduto 
} from "./controlls/ProdutoControll"

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

function logInfo() {
    console.log(`API em execucao na URL: http://localhost:${PORT}`)
}

app.post('/api/produtos', novoProduto)
app.get('/api/produtos', listarProdutos)
app.get('/api/produtos/:id', buscarPorID)
app.put('/api/produtos/:id', atualizarProduto)
app.delete('/api/produtos/:id', removerProduto)

app.listen(PORT, logInfo);
