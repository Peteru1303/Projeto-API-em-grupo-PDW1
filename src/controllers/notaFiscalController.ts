import { Request, Response } from "express"
import { NotaFiscalService } from "./../services/notaFiscalService"

const notaFiscalService = new NotaFiscalService();

export function listarNotasFiscal(req: Request, res: Response): void {
    try {
        const notasFiscal = notaFiscalService.listarNotasFiscais()
        res.status(200).json(notasFiscal)
    } catch (e: any) {
        res.status(404).json({ Message: e.message})
    }
}

export function buscaNotaFiscaPorID(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id)
        const produtos = notaFiscalService.buscarPorID(id);
        res.status(200).json(produtos)
    } catch (e: any) {
        res.status(404).json({ Message: e.message })
    }
}

export function emiteNotaFiscal(req: Request, res: Response): void {
    try {
        let data: any = req.body
        const produto = notaFiscalService.cadastrarNotaFiscal(data)
        res.status(201).json(produto)
    } catch (e: any) {
        if (e.message === "O valor total deve ser maior que zero" || 
            e.message === "A data de emissão tem que ser a data atual ou uma data anterior à atual") {
            res.status(400).json({ Message: e.message })
        } 

        if (e.message === "Precisa ter um carro no estoque") {
            res.status(404).json({ Message: e.message })
        } 

        if (e.message === "O numero da nota fiscal já existe") {
            res.status(409).json({ Message: e.message })
        } 
        
        if (e.message === "Os campos cliente, vendedor e carro são obrigatórios e devem ter registro no sistema") {
            res.status(422).json({ Message: e.message })
        }
    }
}