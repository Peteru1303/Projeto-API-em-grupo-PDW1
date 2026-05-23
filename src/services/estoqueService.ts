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

    cadastrarEstoque(estoque: any, id: number): Estoque {
        const { id_carro, quantidade, localizacao_patio, data_entrada } = estoque;

        if (!id_carro) {
            throw new Error("Deve haver carro vinculado ao registro do estoque");
        }

        const carro = this.carroRepository.buscarPorID(estoque.id_carro.id);
        if (!carro) {
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

        const listEstoque = this.estoqueRepository.listarEstoque();
        const estoqueAtivo = listEstoque.find(e => e.carro.id === carro.id);
        if (estoqueAtivo) {
            throw new Error("Não pode existir mais de um registro de estoque ativo para o mesmo id_carro.");
        }

        const newEstoque = new Estoque(carro, quantidade, localizacao_patio, dataEntrada);

        this.estoqueRepository.novoEstoque(newEstoque);

        return newEstoque;
    }

    atualizarEstoque(estoqueData: any, id: number): Estoque {
        const estoque = this.estoqueRepository.buscarPorID(id);
        if (!estoque) {
            throw new Error("Estoque nao encontrado");
        }

        const { id_carro, quantidade, localizacao_patio, data_entrada } = estoqueData;

        if (!id_carro) {
            throw new Error("Deve haver carro vinculado ao registro do estoque");
        }

        const carro = this.carroRepository.buscarPorID(estoqueData.id_carro.id);
        if (!carro) {
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

        const listEstoque = this.estoqueRepository.listarEstoque();
        const estoqueAtivo = listEstoque.find(e => e.carro.id === carro.id && e.id !== id);
        if (estoqueAtivo) {
            throw new Error("Não pode existir mais de um registro de estoque ativo para o mesmo id_carro.");
        }

        estoque.carro = carro;
        estoque.quantidade = quantidade;
        estoque.localizacao_patio = localizacao_patio;
        estoque.data_entrada = dataEntrada;

        this.estoqueRepository.atualizarEstoque(estoque, id);
        return estoque;
    }
}
