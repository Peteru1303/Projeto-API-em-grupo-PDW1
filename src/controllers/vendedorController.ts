import { Request, Response } from "express"
import { VendedorService } from "./../services/vendedorService"


export class VendedorController {
    private vendedorService = new VendedorService()

    async cadastraVendedor(req: Request, res: Response): Promise<void> {
        try {
            let data: any = req.body
            const vendedor = await this.vendedorService.cadastrar(data)
            res.status(201).json(vendedor)
        } catch (e: any) {
            if (e.message === "Já existe esse numero de matricula") {
                res.status(409).json({ Message: e.message })
            } else if (e.message === "Matricula não inserida. Ela é obrigatório.") {
                res.status(400).json({ Message: e.message }) //corrigo 'if' para 'else if' para evitar que o mesmo erro seja tratado em dois blocos diferentes
            } else if (e.message === "A comissao percentual deve ser entre 0 e 30.") { //CORRIGIDO para tratar o erro específico de comissão percentual inválida, para que o controller possa retornar uma resposta adequada para o cliente. Antes estava tratando esse erro como um erro genérico, o que dificultava a identificação do problema e a resposta adequada para o cliente.
                res.status(400).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro desconhecido" })
            }
        }
    }

    async listarVendedor(req: Request, res: Response): Promise<void> {
        try {
            const vendedor = await this.vendedorService.listarVendedor()
            res.status(200).json(vendedor)
        } catch (e: any) {
            res.status(400).json({ 
                Message: "Erro interno ao listar" 
            })
        }
    }

    async buscaVendedorPorID(req: Request, res: Response): Promise<void> {
        try {
            let idBusca = Number(req.params.id) //corrigo para Number, pois o id é do tipo number, e o service espera um number para buscar por ID. Se for string, o service não encontrará o vendedor mesmo que exista.
            const vendedor = await this.vendedorService.buscarPorID(idBusca)
            res.status(200).json(vendedor)
        } catch (e: any) {
            if (e.message === "Vendedor nao encontrado") {
                res.status(404).json({ 
                    Message: e.message 
                })
            } else {
                res.status(400).json({ 
                    Message: "Erro interno da aplicacao" 
                })
            }
        }
    }

    async atualizaVendedor(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            let data: any = req.body
            const vendedor = await this.vendedorService.atualizarVendedor(data, id)

            res.status(200).json(vendedor)
        } catch (e: any) {
            if (e.message === "Vendedor nao encontrado") {
                res.status(404).json({ 
                    Message: e.message 
                })
            } else {
                res.status(400).json({ 
                    Message: e.message 
                })
            }
        }
    }

    async removeVendedor(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            await this.vendedorService.removerVendedor(id)
            res.status(200).json({ Message: "Vendedor removido com sucesso" })
        } catch (e: any) {
            if (e.message === "Vendedor nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(422).json({ Message: "Não é permitido a remoção de vendedores vinculados à notas fiscais" })
            }
        }
    }

    async listaTodasNotasFiscaisVendedor(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            const notasFiscais = await this.vendedorService.listaTodasNotasFiscaisVendedor(id)
            res.status(200).json(notasFiscais) //CORRIGIDO retorno do json
        } catch (e: any) {
            if (e.message === "Vendedor nao encontrado") {
                res.status(404).json({ Message: e.message })
            } else if (e.message === "Vendedor não tem notas fiscais.") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: "Erro interno da aplicacao" })
            }
        }
    }
}