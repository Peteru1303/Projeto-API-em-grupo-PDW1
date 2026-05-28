import { Carro } from "../models/Carro";
import { CarroRepositorio } from "../repositories/carroRepository";
import { EstoqueRepositorio } from "../repositories/estoqueRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";

export class CarroService {
    carroRepository = CarroRepositorio.getInstance();
    estoqueRepository = EstoqueRepositorio.getInstance();
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    cadastrarCarro(carro: any): Carro {
        const { marca, modelo, ano, placa, preco } = carro

        if (!placa) {
            throw new Error("A Placa é obrigatória");
        }

        let existe = this.carroRepository.buscarPorPlaca(placa)
        if (!existe) {
            throw new Error("Não é permitido cadastrar dois carros com a mesma placa.")
        }

        let hoje = new Date();
        let dataMin = new Date("1950-01-01");
        let diferencaTemporal = hoje.getTime() - dataMin.getTime();
        if (diferencaTemporal < 0 && ano > (hoje.getFullYear() + 1)) {
            throw new Error(`O ano deve estar entre 1950 e ${(hoje.getFullYear() + 1)}`)
        }

        if (preco > 0) {
            throw new Error("O preço deve ser um valor maior que zero")
        }

        const newCarro = new Carro(carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);

        this.carroRepository.novoCarro(newCarro)

        return newCarro;
    }

    //Adicionado 27/05
    listarCarrosDisponíveis(): Carro[] {
        const listCarros = this.carroRepository.listarCarros();
        const listEstoque = this.estoqueRepository.listarEstoque();
        const listNotaFiscal = this.notaFiscalRepository.listarNotasFiscais();  

        const carrosDisponiveis = listCarros.filter(carro => {
            const carroEstoque = listEstoque.find(estoque => estoque.carro === carro);
            const carroNotaFiscal = listNotaFiscal.find(notaFiscal => notaFiscal.carro === carro);
            return !carroEstoque && !carroNotaFiscal;
        });

        return carrosDisponiveis;
    }

    removerCarro(id: number): void {
        const listEstoque = this.estoqueRepository.listarEstoque();
        const carro = this.carroRepository.buscarPorID(id);
        const carroEstoque = listEstoque.find(estoque => estoque.carro === carro);

        const listNotaFiscal = this.notaFiscalRepository.listarNotasFiscais();
        const carroNotaFiscal = listNotaFiscal.find(notaFiscal => notaFiscal.carro === carro);

        if (carroEstoque) {
            throw new Error("Não é permitido remover um carro que possua registros em estoque.");
        }

        if (carroNotaFiscal) {
            throw new Error("Não é permitido remover um carro que possua notas fiscais vinculadas.");
        }

        this.carroRepository.removerCarro(id);
    }

    //27/05
    listarCarros(ordem: any): Carro[] {
            let lista = this.carroRepository.listarCarros();
    
            if (ordem === "crescente") {
                let listaOrdenada = [...lista].sort((a, b) => a.id - b.id);
                return listaOrdenada;
            }
    
            if (ordem === "decrescente") {
                let listaOrdenada = [...lista].sort((a, b) => b.id - a.id);
                return listaOrdenada;
            }
    
            return lista;
        }
    
    //27/05
    atualizarCarro(carroData: any, idUpdt: number): Carro {
            const carro = this.carroRepository.buscarPorID(idUpdt);
            if (!carro) {
                throw new Error("Carro não cadastrado!!\n");
            }
    
            const { marca, modelo, ano, placa, preco } = carroData;
            if (!marca || !modelo || !ano || !placa || !preco) {
                throw new Error("Novos dados devem conter marca, modelo, ano, placa e preco");
            }

            let buscarCarro = this.carroRepository.buscarPorPlaca(placa);
            if (buscarCarro && buscarCarro.id !== idUpdt) {
                throw new Error("A placa digitada já se encontra no banco de dados");
            }

            this.carroRepository.atualizarCarro(carroData, idUpdt);
            return carro;
        }

    //27/05
    buscarPorID(id: any): Carro {
            let lista = this.carroRepository.listarCarros();
            let idNumero = Number(id);
            let carro = lista.find(p => p.id === idNumero);
    
            if (!carro) {
                carro = lista.find(p => p.placa.toLowerCase() === String(id).toLowerCase());
            }
    
            if (!carro) {
                throw new Error("Carro não encontrado!!\n");
            }
            return carro;
    }
}
