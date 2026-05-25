import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"


const clienteService = new ClienteService()

export function cadastraCiente(req: Request, res: Response): void {
    try {
        let data: any = req.body

        if (!data.nome || !data.preco || !data.fabricante) {
            throw new Error("Cliente requer id, nome, preco e fabricante")
        }

        let idNum = Number(data.id)

        const cliente = clienteService.cadastrarCliente(data)

        res.status(200).json(cliente)
    } catch (e: any) {
        res.status(400).json({
            Message: e.message
        })
    }
}

export function listarCliente(req: Request, res: Response): void {
    try {
        let ordem = req.query.ordem
        const cliente = clienteService.listarClientes(ordem)
        res.status(200).json(cliente)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro interno ao listar" })
    }
}

export function buscaClientePorID(req: Request, res: Response): void {
    try {
        let idBusca = req.params.id
        const cliente = clienteService.buscarPorID(idBusca)
        res.status(200).json(cliente)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno da aplicacao" })
        }
    }
}

export function atualizarCliente(req: Request, res: Response): void {
    try {
        let idAlt = Number(req.params.id)
        let data: any = req.body

        const cliente = clienteService.atualizarCliente(data, idAlt)

        res.status(200).json(cliente)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: e.message })
        }
    }
}

export function removerCliente(req: Request, res: Response): void {
    try {
        let idRem = Number(req.params.id)
        clienteService.removerCliente(idRem)
        res.status(200).json({ Message: "Cliente removido com sucesso" })
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno ao remover" })
        }
    }
}
