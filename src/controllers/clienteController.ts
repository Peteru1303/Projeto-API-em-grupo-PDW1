import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"


const clienteService = new ClienteService()

export function cadastraCiente(req: Request, res: Response): void {
    try {
        let data: any = req.body
        const cliente = clienteService.cadastrarCliente(data)

        res.status(201).json(cliente)
    } catch (e: any) {
        if (e.message === "CPF digitado já existe") {
            res.status(409).json({ Message: e.message })
        } if (e.message === "CPF, nome ou telefone nao inseridos.") {
            res.status(400).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: "Erro desconhecido" })
        }
    }
}

export function listarCliente(req: Request, res: Response): void {
    try {
        const cliente = clienteService.listarClientes()
        res.status(200).json(cliente)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: "Erro desconhecido" })
        }
    }
}

export function buscaClientePorID(req: Request, res: Response): void {
    try {
        let idBusca = Number(req.params.id)
        const cliente = clienteService.buscarPorID(idBusca)
        res.status(200).json(cliente)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: "Erro desconhecido" })
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
        } if (e.message === "O CPF digitado já se encontra no banco de dados") {
            res.status(409).json({ Message: e.message })
        } if (e.message === "Novos dados devem conter nome, cpf e telefone") {
            res.status(400).json({ Message: e.message })
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
        } if (e.message === "Não pode deletar Cliente com Nota Fiscal Vinculada") {
            res.status(422).json({ Message: e.message })
        }
        res.status(400).json({ Message: "Erro desconhecido" })
    }
}

export function listarTodasNotasFiscaisCliente(req: Request, res: Response): void {
    try {
        let idNFC = Number(req.params.id)
        clienteService.listarTodasNotasFiscaisCliente(idNFC)
        res.status(200).json({ Message: "Notas Fiscais Clientes recuperadas com sucesso" })
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } if (e.message === "Cliente não tem notas fiscais.") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: "Erro desconhecido" })
        }
    }
}