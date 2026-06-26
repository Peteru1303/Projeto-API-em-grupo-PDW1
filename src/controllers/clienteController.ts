import { Request, Response } from "express"
import { ClienteService } from "../services/clienteService"

export class ClienteController {
    private clienteService = new ClienteService();

    async cadastraCliente(req: Request, res: Response): Promise<void> {
        try {
            let data: any = req.body
            const cliente = await this.clienteService.cadastrarCliente(data)

            res.status(201).json(cliente)
        } catch (e: any) {
            if (e.message === "CPF digitado já existe") {
                res.status(409).json({ Message: e.message })
            } else if (e.message === "CPF, nome ou telefone nao inseridos.") {
                res.status(400).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }

    async listarCliente(req: Request, res: Response): Promise<void> {
        try {
            const cliente = await this.clienteService.listarClientes()
            res.status(200).json(cliente)
        } catch (e: any) {
            if (e.message === "Cliente nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }

    async buscaClientePorID(req: Request, res: Response): Promise<void> {
        try {
            let idBusca = Number(req.params.id)
            const cliente = await this.clienteService.buscarPorID(idBusca)
            res.status(200).json(cliente)
        } catch (e: any) {
            if (e.message === "Cliente não encontrado!!") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }

    async atualizarCliente(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            let data: any = req.body

            const cliente = await this.clienteService.atualizarCliente(data, id)

            res.status(200).json(cliente)
        } catch (e: any) {
            if (e.message === "Cliente nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else if (e.message === "Novos dados devem conter nome, cpf e telefone") {
                res.status(400).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: e.message })
            }
        }
    }

    async removerCliente(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            await this.clienteService.removerCliente(id)
            res.status(200).json({ Message: "Cliente removido com sucesso" })
        } catch (e: any) {
            if (e.message === "Cliente nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else if (e.message === "Não pode deletar Cliente com Nota Fiscal Vinculada") {
                res.status(422).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }

    async listarTodasNotasFiscaisCliente(req: Request, res: Response): Promise<void> {
        try {
            let idNFC = Number(req.params.id)
            const notafiscal = await this.clienteService.listarTodasNotasFiscaisCliente(idNFC)
            res.status(200).json({ Message: "Notas Fiscais Clientes recuperadas com sucesso" })
        } catch (e: any) {
            if (e.message === "Cliente nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else if (e.message === "Cliente não tem notas fiscais.") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }
}