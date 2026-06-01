import { Request, Response } from "express"
import { EstoqueService } from "./../services/estoqueService"

const estoqueService = new EstoqueService()

export function cadastraEstoque(req: Request, res: Response): void {
    try {
        let data: any = req.body
        const estoque = estoqueService.cadastrarEstoque(data)
        res.status(201).json(estoque)
    } catch (e: any) {
        if (e.message === "O campo quantidade deve ser um inteiro maior ou igual a zero." || e.message === "O item está indisponível, mas ainda consta no histórico." || e.message === "Esse campo não pode ter uma data futura em relação à data atual do servidor.") {
            res.status(400).json({ 
                Message: e.message 
            })
        }
        if (e.message === "Estoque nao encontrado") {
            res.status(404).json({ 
                Message: e.message 
            })
        }
        if (e.message === "Deve haver carro vinculado ao registro do estoque" || e.message === "O carro referenciado deve existir no sistema." || e.message === "Não pode existir mais de um registro de estoque ativo para o mesmo id_carro.") {
            res.status(409).json({ 
                Message: e.message 
            })
        }
    }
}

export function listarEstoque(req: Request, res: Response): void {
    try {
        const estoque = estoqueService.listarEstoque()
        res.status(200).json(estoque)
    } catch (e: any) {
        res.status(404).json({ 
            Message: e.message 
        })
    }
}

export function buscaEstoquePorID(req: Request, res: Response): void {
    try {
        let idBusca = Number(req.params.id)
        const estoque = estoqueService.buscarPorID(idBusca)
        res.status(200).json(estoque)
    } catch (e: any) {
            res.status(404).json({ 
                Message: e.message 
            })
    }
}

export function buscaEstoqueCarro(req: Request, res: Response): void {
    try {
        let idCarro = req.params.id_carro
        const estoque = estoqueService.buscarPorCarro(idCarro)
        res.status(200).json(estoque)
    } catch (e: any) {
        if (e.message === "Estoque do carro nao encontrado") {
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

export function atualizarEstoque(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        let data: any = req.body
        const estoque = estoqueService.atualizarEstoque(data, id)
        res.status(200).json(estoque)
    } catch (e: any) {
        if (e.message === "Estoque nao encontrado") {
            res.status(404).json({ 
                Message: e.message 
            })
        } if (e.message === "Deve haver carro vinculado ao registro do estoque") {
            res.status(409).json({ 
                Message: e.message 
            })
        } else {
            res.status(400).json({ 
                Message: e.message 
            })
        }
    }
}

export function removeEstoque(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        estoqueService.removerEstoque(id)
        res.status(200).json({ 
            Message: "Estoque removido com sucesso" 
        })
    } catch (e: any) {
        if (e.message === "Estoque nao encontrado") {
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
