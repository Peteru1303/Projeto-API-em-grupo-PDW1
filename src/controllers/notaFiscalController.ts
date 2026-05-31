import { Request, Response } from "express"
import { NotaFiscalService } from "./../services/notaFiscalService"

const notaFiscalService = new NotaFiscalService();

export function listarNotasFiscal(req: Request, res: Response): void {
    try {
        const notasFiscal = notaFiscalService.listarNotasFiscais()
        res.status(200).json(notasFiscal)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro 500 ao listar" })
    }
}

export function buscaNotaFiscaPorID(req: Request, res: Response): void {
    try {
        let id = req.params.id
        const produtos = notaFiscalService.buscarPorID(id);
        res.status(200).json(produtos)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro 500 na busca por id" })
    }
}

export function emiteNotaFiscal(req: Request, res: Response): void {
    try {
        let data: any = req.body
        const produto = notaFiscalService.cadastrarNotaFiscal(data)
        res.status(201).json(produto)
    } catch (e: any) {
        if (e.message === "Erro 400, produto nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro 500 na aplicacao" })
        }
    }
}