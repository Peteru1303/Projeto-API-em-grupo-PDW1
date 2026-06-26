import { Carro } from "../models/Carro";
import { CarroRepositorio } from "../repositories/carroRepository";
import { EstoqueRepositorio } from "../repositories/estoqueRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";

export class CarroService {
    carroRepository = CarroRepositorio.getInstance();
    estoqueRepository = EstoqueRepositorio.getInstance();
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    async cadastrarCarro(carro: any): Promise<Carro> {
        const { marca, modelo, ano, placa, preco } = carro

        if (!placa) {
            throw new Error("A Placa é obrigatória");
        }

        let existe = await this.carroRepository.buscarPorPlaca(placa)
        if (existe) {
            throw new Error("Não é permitido cadastrar dois carros com a mesma placa.")
        }

        let hoje = new Date();
        // let dataMin = new Date("1950-01-01");
        // let diferencaTemporal = hoje.getTime() - dataMin.getTime();
        if (ano < 1950 || ano > (hoje.getFullYear() + 1)) {
            throw new Error("O ano deve estar entre 1950 e a data atual")
        }

        if (preco <= 0) {
            throw new Error("O preço deve ser um valor maior que zero")
        }

        const newCarro = new Carro(null, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);

        await this.carroRepository.novoCarro(newCarro)

        return newCarro;
    }

    async listarCarrosDisponíveis(): Promise<Carro[]> {
        const listCarros = await this.carroRepository.listarCarros();
        const listEstoque = await this.estoqueRepository.listarEstoque();
        const estoqueComQuantidade = listEstoque.filter(e => e.quantidade > 0)
        let carros: Carro[] = []
        for (let i = 0; i < estoqueComQuantidade.length; i++) {
            const carroDisponivel = listCarros.find(d => d.id === estoqueComQuantidade[i].id)
            if (carroDisponivel)
                carros.push(carroDisponivel)
        }

        return carros;
    }

    async removerCarro(idRem: number): Promise<void> {
        const listEstoque = await this.estoqueRepository.listarEstoque();
        const carro = await this.carroRepository.buscarPorID(idRem);
        const carroEstoque = listEstoque.find(estoque => estoque.carro === idRem);

        const listNotaFiscal = await this.notaFiscalRepository.listarNotasFiscais();
        const carroNotaFiscal = listNotaFiscal.find(notaFiscal => notaFiscal.carro === idRem);

        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        if (carroEstoque) {
            throw new Error("Não é permitido remover um carro que possua registros em estoque.");
        }

        if (carroNotaFiscal) {
            throw new Error("Não é permitido remover um carro que possua notas fiscais vinculadas.");
        }

        await this.carroRepository.removerCarro(idRem);
    }

    async listarCarros(): Promise<Carro[]> {
        return await this.carroRepository.listarCarros();
    }

    async atualizarCarro(carroData: any, id: number): Promise<Carro> {
        const carro = await this.carroRepository.buscarPorID(id);
        if (!carro) {
            throw new Error("Carro não cadastrado!!!");
        }

        const { marca, modelo, ano, placa, preco } = carroData;
        if (!marca || !modelo || !ano || !placa || !preco) {
            throw new Error("Novos dados devem conter marca, modelo, ano, placa e preco");
        }

        await this.carroRepository.atualizarCarro(carroData, id);
        return carro;
    }

    async buscarPorID(id: number): Promise<Carro> {
        const carro = await this.carroRepository.buscarPorID(id);
        if (!carro) {
            throw new Error("Carro não encontrado!!\n");
        }
        return carro;
    }
}
