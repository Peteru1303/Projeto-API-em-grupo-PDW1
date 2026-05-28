//Responsável: Matheus

import { Request, Response } from 'express'
import { CarroService } from "../services/carroService"

/*app.get('/carros', listarCarro);
app.get('/carros/:id', buscaCarroPorID);
app.get('/carros/disponiveis', listaCarroDisponivel);
app.post('/carros', cadastraCarro);
app.put('/carros/:id', atualizarCarroExistente);
app.delete('/carros/:id', removeCarro);*/

const carroService = new CarroService();

export function listarCarro(req: Request, res: Response): void {
    try {
        let ordem = req.query.ordem
        const carro = carroService.listarCarros(ordem) //Necessita implementar funçaõ em service
        res.status(200).json(carro)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro interno ao listar" })
    }
}

export function buscaCarroPorID(req: Request, res: Response): void {
    try {
        let idBusca = req.params.id
        const carro = carroService.buscarPorID(idBusca) //Necessita implementar funçaõ em service
        res.status(200).json(carro)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno da aplicacao" })
        }
    }
}

//Adicionado: 27/05
export function listaCarroDisponivel(req: Request, res: Response): void {
    try {
        const carros = carroService.listarCarrosDisponíveis()
        res.status(200).json(carros)
    } catch (e: any) {
        res.status(500).json({ Message: "Erro interno ao listar carros disponíveis" })
    }
}

export function cadastraCarro(req: Request, res: Response): void {
    try {
        let data: any = req.body

        const carro = carroService.cadastrarCarro(data)

        res.status(200).json(carro)
    } catch (e: any) {
        res.status(400).json({
            Message: e.message
        })
    }
}

export function atualizarCarroExistente(req: Request, res: Response): void {
    try {
        let idAlt = Number(req.params.id)
        let data: any = req.body

        const carro = carroService.atualizarCarro(data, idAlt) //Necessita implementar funçaõ em service

        res.status(200).json(carro)
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: e.message })
        }
    }
}

export function removerCarro(req: Request, res: Response): void {
    try {
        let idRem = Number(req.params.id)
        
        const carro = carroService.removerCarro(idRem)
        
        res.status(200).json({ Message: "Carro removido com sucesso" })
    } catch (e: any) {
        if (e.message === "Cliente nao encontrado") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(500).json({ Message: "Erro interno ao remover" })
        }
    }
}
