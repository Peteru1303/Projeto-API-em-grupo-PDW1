import { Request, Response } from "express"
import { VendedorService } from "./../services/vendedorService"

const vendedorService = new VendedorService()

export function cadastraVendedor(req: Request, res: Response): void {
    try {
        let data: any = req.body
        const vendedor = vendedorService.cadastrar(data)
        res.status(201).json(vendedor)
    } catch (e: any) {
        if (e.message === "Já existe esse numero de matricula") {
            res.status(409).json({ Message: e.message })
        } else if (e.message === "Matricula não inserida. Ela é obrigatório.") {
            res.status(400).json({ Message: e.message }) //corrigo 'if' para 'else if' para evitar que o mesmo erro seja tratado em dois blocos diferentes
        } else {
            res.status(400).json({ Message: "Erro desconhecido" })
        }
    }
}

export function listarVendedor(req: Request, res: Response): void {
    try {
        const vendedor = vendedorService.listarVendedor()
        res.status(200).json(vendedor)
    } catch (e: any) {
        res.status(400).json({ 
            Message: "Erro interno ao listar" 
        })
    }
}

export function buscaVendedorPorID(req: Request, res: Response): void {
    try {
        let idBusca = Number(req.params.id) //corrigo para Number, pois o id é do tipo number, e o service espera um number para buscar por ID. Se for string, o service não encontrará o vendedor mesmo que exista.
        const vendedor = vendedorService.buscarPorID(idBusca)
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

export function atualizaVendedor(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        let data: any = req.body
        const vendedor = vendedorService.atualizarVendedor(data, id)

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

export function removeVendedor(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        vendedorService.removerVendedor(id)
        res.status(200).json({ Message: "Vendedor removido com sucesso" })
    } catch (e: any) {
        if (e.message === "Vendedor nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(422).json({ Message: "Não é permitido a remoção de vendedores vinculados à notas fiscais" })
        }
    }
}

export function listaTodasNotasFiscaisVendedor(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        const notasFiscais = vendedorService.listaTodasNotasFiscaisVendedor(id)
        res.status(200).json(notasFiscais) //CORRIGIDO retorno do json
    } catch (e: any) {
        if (e.message === "Vendedor nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: "Erro interno da aplicacao" })
        }
    }
}
