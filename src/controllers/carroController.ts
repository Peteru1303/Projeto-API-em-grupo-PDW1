import { Request, Response } from 'express'
import { CarroService } from "../services/carroService"

const carroService = new CarroService();

export function listarCarro(req: Request, res: Response): void {
    try {
        let ordem = req.query.ordem
        const carro = carroService.listarCarros(ordem) 
        res.status(200).json(carro)
    } catch (e: any) {
        res.status(400).json({ Message: "Erro interno ao listar" })
    }
}

export function buscaCarroPorID(req: Request, res: Response): void {
    try {
        let idBusca = req.params.id
        const carro = carroService.buscarPorID(idBusca) 
        res.status(200).json(carro)
    } catch (e: any) {
        if (e.message === "Carro não encontrado!!\n") {
            res.status(404).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: e.message })
        }
    }
}

export function listaCarroDisponivel(req: Request, res: Response): void {
    try {
        const carros = carroService.listarCarrosDisponíveis()
        res.status(200).json(carros)
    } catch (e: any) {
        res.status(400).json({ Message: e.message })
    }
}

export function cadastraCarro(req: Request, res: Response): void {
    try {
        let data: any = req.body

        const carro = carroService.cadastrarCarro(data)

        res.status(201).json(carro)
    } catch (e: any) {
        if (e.message === "Não é permitido cadastrar dois carros com a mesma placa.") {
            res.status(409).json({ Message: e.message })
        } if (e.message === "A Placa é obrigatória" || e.message === "O ano deve estar entre 1950 e a data atual" || e.message === "O preço deve ser um valor maior que zero") {
            res.status(400).json({ Message: e.message })
        } else {
            res.status(400).json({ Message: e.message })
        }
    }
}

export function atualizarCarroExistente(req: Request, res: Response): void {
    try {
        let idAlt = Number(req.params.id)
        let data: any = req.body

        const carro = carroService.atualizarCarro(data, idAlt) //Necessita implementar funçaõ em service

        res.status(200).json(carro)
    } catch (e: any) {
        if (e.message === "Carro não cadastrado!!\n") {
            res.status(404).json({ Message: e.message })
        } if (e.message === "Novos dados devem conter marca, modelo, ano, placa e preco") {
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
        if (e.message === "Não é permitido remover um carro que possua registros em estoque." || e.message === "Não é permitido remover um carro que possua notas fiscais vinculadas.") {
            res.status(422).json({ Message: e.message })
        }
        res.status(400).json({ Message: e.message })
    }
}
