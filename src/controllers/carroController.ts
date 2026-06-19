import { Request, Response } from 'express'
import { CarroService } from "../services/carroService"

export class CarroController {
    private carroService = new CarroService();

    async function listarCarro(req: Request, res: Response): Promise<void> {
        try {
            const carro = await carroService.listarCarros()
            res.status(200).json(carro)
        } catch (e: any) {
            res.status(404).json({ Message: e.message })
        }
    }

    async function buscaCarroPorID(req: Request, res: Response): Promise<void> {
        try {
            let idBusca = Number(req.params.id)
            const carro = await carroService.buscarPorID(idBusca) 
            res.status(200).json(carro)
        } catch (e: any) {
            if (e.message === "Carro não encontrado!!\n") {
                res.status(404).json({ Message: e.message })
            } else {
                res.status(400).json({ Message: e.message })
            }
        }
    }

    async function listaCarroDisponivel(req: Request, res: Response): Promise<void> {
        try {
            const carros = await carroService.listarCarrosDisponíveis()
            res.status(200).json(carros)
        } catch (e: any) {
            res.status(404).json({ Message: e.message })
        }
    }

    async function cadastraCarro(req: Request, res: Response): Promise<void> {
        try {
            let data: any = req.body

            const carro = await carroService.cadastrarCarro(data)

            res.status(201).json(carro)
        } catch (e: any) {
            if (e.message === "Não é permitido cadastrar dois carros com a mesma placa.") {
                res.status(409).json({ Message: e.message })
            } if (e.message === "A Placa é obrigatória" || e.message === "O ano deve estar entre 1950 e a data atual" || e.message === "O preço deve ser um valor maior que zero") {
                res.status(400).json({ Message: e.message })
            } 
        }
    }

    async function atualizarCarroExistente(req: Request, res: Response): Promise<void> {
        try {
            let id = Number(req.params.id)
            let data: any = req.body

            const carro = await carroService.atualizarCarro(data, id) 

            res.status(200).json(carro)
        } catch (e: any) {
            if (e.message === "Carro não cadastrado!!!") {
                res.status(404).json({ Message: e.message })
            } if (e.message === "Novos dados devem conter marca, modelo, ano e preco") {
                res.status(400).json({ Message: e.message })
            }
        }
    }

    async function removerCarro(req: Request, res: Response): Promise<void> {
        try {
            let idRem = Number(req.params.id)
            
            const carro = await carroService.removerCarro(idRem)
            
            res.status(200).json({ Message: "Carro removido com sucesso" })
        } catch (e: any) {
            if (e.message === "Não é permitido remover um carro que possua registros em estoque." || e.message === "Não é permitido remover um carro que possua notas fiscais vinculadas.") {
                res.status(422).json({ Message: e.message })
            }
            res.status(404).json({ Message: e.message })
        }
    }
}
