import { Estoque } from "../models/Estoque";

export class EstoqueRepositorio {
    private static instance: EstoqueRepositorio;
    private estoqueList: Estoque[] = [];

    private constructor() { };

    public static getInstance(): EstoqueRepositorio {
        if (!this.instance) {
            this.instance = new EstoqueRepositorio();
        }
        return this.instance;
    }

    novoEstoque(estoque: Estoque): void {
        this.estoqueList.push(estoque);
    }


    listarEstoque(): Estoque[] {
        return this.estoqueList;
    }

    buscarPorID(id: number): Estoque | undefined {
        return this.estoqueList.find(estoque=> estoque.id === id);
    }

    atualizarEstoque(estoqueData: any, idAlt: number): void {
        let estoque: Estoque | undefined = this.buscarPorID(idAlt);

        if (estoque) {
            estoque.carro = estoqueData.carro;
            estoque.quantidade = estoqueData.quantidade;
            estoque.localizacao_patio = estoqueData.localizacao_patio;
            estoque.data_entrada = estoqueData.data_entrada;
        }
    }

    removerEstoque(idRem: number): void {
        let estoque: Estoque | undefined = this.buscarPorID(idRem);

        if(estoque){
            let index = this.estoqueList.indexOf(estoque);
            this.estoqueList.splice(index, 1);
            /* ou pop */
        }
    }
    //Adicionar função de retornar o estoque de carro especifico
}