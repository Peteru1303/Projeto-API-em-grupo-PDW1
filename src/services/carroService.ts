import { Carro } from "../models/Carro";
import { CarroRepositorio } from "../repositories/carroRepository";
import { EstoqueRepositorio } from "../repositories/estoqueRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";

export class CarroService {
    carroRepository = CarroRepositorio.getInstance();
    estoqueRepository = EstoqueRepositorio.getInstance();
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    cadastrarCarro(carro: any, id: number): Carro {
        const { marca, modelo, ano, placa, preco } = carro
        
        if(!placa) {
            throw new Error ("A Placa é obrigatória") ;
        }

        let existe = this.carroRepository.buscarPorPlaca(placa)
        if(!existe) {
            throw new Error("Não é permitido cadastrar dois carros com a mesma placa.")
        }

        let hoje = new Date();
        let dataMin = new Date("1950-01-01");
        let diferencaTemporal = hoje.getTime() - dataMin.getTime(); 
        if (diferencaTemporal < 0 || ano > (hoje.getFullYear() + 1) ) {
            throw new Error(`O ano deve estar entre 1950 e ${(hoje.getFullYear() + 1)}`)
        }

        if (preco > 0) {
            throw new Error("O preço deve ser um valor maior que zero")
        }

        const newCarro = new Carro(carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);

        this.carroRepository.novoCarro(newCarro)

        return newCarro;
    }

    // listarCarros(ordem: any): Carro[] {
    //     let lista = this.carroRepository.listarCarros();

    //     if (ordem === "crescente") {
    //         let listaOrdenada = [...lista].sort((a, b) => a.preco - b.preco);
    //         return listaOrdenada;
    //     }

    //     if (ordem === "decrescente") {
    //         let listaOrdenada = [...lista].sort((a, b) => b.preco - a.preco);
    //         return listaOrdenada;
    //     }

    //     return lista;
    // }

    // buscarPorID(id: any): Carro {
    //     let lista = this.carroRepository.listarCarros();
    //     let idNumero = Number(id);
    //     let carro = lista.find(c => c.id === idNumero);

    //     if (!carro) {
    //         carro = lista.find(c => c.nome.toLowerCase() === String(id).toLowerCase());
    //     }

    //     if (!carro) {
    //         throw new Error("Carro nao encontrado");
    //     }
    //     return carro;
    // }

    // atualizarCarro(carroData: any, idAlt: number): Carro {
    //     const carro = this.carroRepository.buscarPorID(idAlt);
    //     if (!carro) {
    //         throw new Error("Carro nao encontrado");
    //     }

    //     const { nome, preco, fabricante } = carroData;
    //     if (!nome || !preco || !fabricante) {
    //         throw new Error("Novos dados devem conter nome, preco e fabricante");
    //     }
    //     if (preco <= 0) {
    //         throw new Error("O preco deve ser maior que zero");
    //     }
    //     if (!fabricante.nome || !fabricante.endereco || !fabricante.endereco.cidade || !fabricante.endereco.pais) {
    //         throw new Error("Fabricante deve conter nome, cidade e pais");
    //     }

    //     this.carroRepository.atualizarCarro(carroData, idAlt);
    //     return carro;
    // }

    removerCarro(id: number): void {
        const listEstoque = this.estoqueRepository.listarEstoque();
        const carro = this.carroRepository.buscarPorID(id);
        const carroEstoque = listEstoque.find(estoque=> estoque.carro === carro);

        const listNotaFiscal = this.notaFiscalRepository.listarNotasFiscais();
        const carroNotaFiscal = listNotaFiscal.find(notaFiscal=> notaFiscal.carro === carro);

        if(carroEstoque) {
            throw new Error("Não é permitido remover um carro que possua registros em estoque.");
        }

        if(carroNotaFiscal) {
            throw new Error("Não é permitido remover um carro que possua notas fiscais vinculadas.");
        }

        this.carroRepository.removerCarro(id);
    }
}
