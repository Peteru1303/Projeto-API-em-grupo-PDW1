import { Estoque } from "../models/Estoque";
import { CarroRepositorio } from "../repositories/carroRepository";
import { EstoqueRepositorio } from "../repositories/estoqueRepository";

/* Vou concluir em casa */
/* 
Cada registro de estoque está vinculado a exatamente um carro (via id_carro). O carro referenciado deve existir no sistema.
• O campo quantidade deve ser um inteiro maior ou igual a zero. Uma quantidade igual a zero
significa que o item está indisponível mas ainda consta no histórico.
• O campo data_entrada não pode ser uma data futura em relação à data atual do servidor.
• Não pode existir mais de um registro de estoque ativo para o mesmo id_carro. Para atualizar a
quantidade, deve-se usar o endpoint de atualização (PUT). 
 */
export class EstoqueService {
    carroRepository = CarroRepositorio.getInstance();
    estoqueRepository = EstoqueRepositorio.getInstance();

    async cadastrarEstoque(estoque: any): Promise<Estoque> {
        const {carro, quantidade, localizacao_patio, data_entrada } = estoque;

        if (!carro) {
            throw new Error("Deve haver carro vinculado ao registro do estoque");
        }

        const carroexiste = await this.carroRepository.buscarPorID(estoque.carro);
        if (!carroexiste) {
            throw new Error("O carro referenciado deve existir no sistema.");
        }

        if (quantidade < 0) {
            throw new Error("O campo quantidade deve ser um inteiro maior ou igual a zero.");
        }

        if (quantidade == 0) {
            console.log("O item está indisponível, mas ainda consta no histórico.");
        }

        const dataEntrada = new Date(data_entrada);
        const hoje = new Date();
        if (dataEntrada.getTime() > hoje.getTime()) {
            throw new Error("Esse campo não pode ter uma data futura em relação à data atual do servidor.");
        }

        const listEstoque = await this.estoqueRepository.listarEstoque();
        const estoqueAtivo = listEstoque.find(e => e.carro === carro);
        if (estoqueAtivo) {
            throw new Error("Não pode existir mais de um registro de estoque ativo para o mesmo carro.");
        }

        const newEstoque = new Estoque(null, carro, quantidade, localizacao_patio, dataEntrada);

        this.estoqueRepository.novoEstoque(newEstoque);

        return newEstoque;
    }

    async atualizarEstoque(estoqueData: any, id: number): Promise<Estoque> {
        const estoque = await this.estoqueRepository.buscarPorID(id);
        if (!estoque) {
            throw new Error("Estoque nao encontrado");
        }

        const {carro, quantidade, localizacao_patio, data_entrada } = estoqueData;

        if (!carro) {
            throw new Error("Deve haver carro vinculado ao registro do estoque");
        }

        const carroexiste = this.carroRepository.buscarPorID(estoqueData.carro);
        if (!carroexiste) {
            throw new Error("O carro referenciado deve existir no sistema.");
        }

        if (quantidade < 0) {
            throw new Error("O campo quantidade deve ser um inteiro maior ou igual a zero.");
        }

        if (quantidade == 0) {
            console.log(" O item está indisponível, mas ainda consta no histórico.");
        }

        const dataEntrada = new Date(data_entrada);
        const hoje = new Date();
        if (dataEntrada.getTime() > hoje.getTime()) {
            throw new Error("Esse campo não pode ter uma data futura em relação à data atual do servidor.");
        }

        estoque.carro = carro;
        estoque.quantidade = quantidade;
        estoque.localizacao_patio = localizacao_patio;
        estoque.data_entrada = dataEntrada;

        this.estoqueRepository.atualizarEstoque(estoque, id);
        return estoque;
    }

    async listarEstoque(): Promise<Estoque[]> {
        let lista = await this.estoqueRepository.listarEstoque();
        if (!lista) {
            throw new Error("Estoque não encontrado!!");
        }
        return lista; //
    }

    async buscarPorID(id: any): Promise<Estoque> {
        const idNumero = Number(id);
        const estoque = await this.estoqueRepository.buscarPorID(idNumero);
        if (!estoque) {
            throw new Error("Estoque nao encontrado");
        }
        return estoque;
    }

    async buscarPorCarro(carro: any): Promise<Estoque> {
        const idCarroNum = Number(carro);
        const list = await this.estoqueRepository.listarEstoque();
        const estoque = list.find(e => e.carro === idCarroNum);
        if (!estoque) {
            throw new Error("Estoque do carro nao encontrado");
        }
        return estoque;
    }

    async removerEstoque(id: number): Promise<void> {
        const estoque = this.estoqueRepository.buscarPorID(id);
        if (!estoque) {
            throw new Error("Estoque nao encontrado");
        }
        this.estoqueRepository.removerEstoque(id);
    }
}
