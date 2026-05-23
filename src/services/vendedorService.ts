import { Vendedor } from "../models/Vendedor";
import { VendedorRepositorio } from "../repositories/vendedorRepository";

export class VendedorService {
    vendedorRepository = VendedorRepositorio.getInstance();

    cadastrar(vendedor: any): Vendedor {
        const { nome, matricula, comissao_percentual } = vendedor
        
        if(!nome || !matricula || !comissao_percentual) {
            throw new Error ("Informacoes incompletas");
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw new Error("A comissao percentual deve ser entre 0 e 30.")
        }

        let lista = this.vendedorRepository.listarVendedor();
        let existeMatricula = lista.find(v => v.nome.toLowerCase() === v.nome.toLowerCase());
        if (existeMatricula) {
            throw new Error("Ja existe uma matricula com este nome")
        }

        const newVendedor = new Vendedor(vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);

        this.vendedorRepository.novoVendedor(newVendedor)

        return newVendedor;
    }

    listarVendedor(ordem: any): Vendedor[] {
        let lista = this.vendedorRepository.listarVendedor();

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

    buscarPorID(id: any): Vendedor {
        let lista = this.vendedorRepository.listarVendedor();
        let idNumero = Number(id);
        let vendedor = lista.find(v => v.id === idNumero);

        if (!vendedor) {
            vendedor = lista.find(v => v.nome.toLowerCase() === String(id).toLowerCase());
        }

        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        return vendedor;
    }

    atualizarVendedor(vendedorData: any, idAlt: number): Vendedor {
        const vendedor = this.vendedorRepository.buscarPorID(idAlt);
        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }

        const { nome, matricula, comissao_percentual } = vendedorData;
        if (!nome || !matricula || !comissao_percentual) {
            throw new Error("Novos dados devem conter nome, matricula e comissao percentual");
        }
        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw new Error("A comissao percentual deve ser entre 0 e 30.")
        }

        let lista = this.vendedorRepository.listarVendedor();
        let existeMatricula = lista.find(v => v.nome.toLowerCase() === v.nome.toLowerCase());
        if (existeMatricula) {
            throw new Error("Ja existe uma matricula com este nome")
        }

        this.vendedorRepository.atualizarVendedor(vendedorData, idAlt);
        return vendedor;
    }

    removerVendedor(idRem: number): void {
        const vendedor = this.vendedorRepository.buscarPorID(idRem);
        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        //Adicionar condicional que não permite remover um vendedor que possua notas fiscais vinculadas a ele.
        this.vendedorRepository.removerVendedor(idRem);
    }
}
