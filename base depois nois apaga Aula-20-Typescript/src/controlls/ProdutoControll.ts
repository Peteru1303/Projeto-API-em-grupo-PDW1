import { Request, Response } from "express"
import { ProductService } from "./../services/ProdutoServices"

const productService = new ProductService()

export function novoProduto(req: Request, res: Response): void {
    try {
        let data: any = req.body

        if (!data.id || !data.nome || !data.preco || !data.fabricante) {
            throw new Error("Produto requer id, nome, preco e fabricante")
        }

        let idNum = Number(data.id)

        const produto = productService.cadastrarProduto(data, idNum)

        res.status(200).json(produto)
    } catch (e: any) {
        res.status(400).json({
            Message: e.message
        })
    }
}

export function listarProdutos(req: Request, res: Response): void {
    try {
        let ordem = req.query.ordem
        const produtos = productService.listarProdutos(ordem)
        res.status(200).json(produtos)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro interno ao listar" })
    }
}

export function buscarPorID(req: Request, res: Response): void {
    try {
        let idBusca = req.params.id
        const produto = productService.buscarPorID(idBusca)
        res.status(200).json(produto)
    } catch (e: any) {
        if (e.message === "Produto nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno da aplicacao" })
        }
    }
}

export function atualizarProduto(req: Request, res: Response): void {
    try {
        let idAlt = Number(req.params.id)
        let data: any = req.body

        const produto = productService.atualizarProduto(data, idAlt)

        res.status(200).json(produto)
    } catch (e: any) {
        if (e.message === "Produto nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: e.message })
        }
    }
}

export function removerProduto(req: Request, res: Response): void {
    try {
        let idRem = Number(req.params.id)
        productService.removerProduto(idRem)
        res.status(200).json({ Message: "Produto removido com sucesso" })
    } catch (e: any) {
        if (e.message === "Produto nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno ao remover" })
        }
    }
}
