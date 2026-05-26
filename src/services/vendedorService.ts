import { Vendedor } from "../models/Vendedor";
import { VendedorRepositorio } from "../repositories/vendedorRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/NotaFiscal";

export class VendedorService {
    vendedorRepository = VendedorRepositorio.getInstance();
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    cadastrar(vendedor: any): Vendedor {
        const { nome, matricula, comissao_percentual } = vendedor
        
        if(!nome || !matricula || !comissao_percentual) {
            throw new Error ("Informacoes incompletas");
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw new Error("A comissao percentual deve ser entre 0 e 30.")
        }

        let lista = this.vendedorRepository.listarVendedor();
        let existeMatricula = lista.find(v => v.nome.toLowerCase() === nome.toLowerCase());
        if (existeMatricula) {
            throw new Error("Ja existe uma matricula com este nome")
        }

        const newVendedor = new Vendedor(vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);

        this.vendedorRepository.novoVendedor(newVendedor)

        return newVendedor;
    }

    listarVendedor(): Vendedor[] {
        return this.vendedorRepository.listarVendedor();
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

    atualizarVendedor(vendedorData: any, id: number): Vendedor {
        const vendedor = this.vendedorRepository.buscarPorID(id);
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
        let existeMatricula = lista.find(v => v.nome.toLowerCase() === nome.toLowerCase());
        if (existeMatricula) {
            throw new Error("Ja existe uma matricula com este nome")
        }

        this.vendedorRepository.atualizarVendedor(vendedorData, id);
        return vendedor;
    }

    removerVendedor(id: number): void {
        const vendedor = this.vendedorRepository.buscarPorID(id);
        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        //Adicionar condicional que não permite remover um vendedor que possua notas fiscais vinculadas a ele.
        const listNotasFiscais = this.notaFiscalRepository.listarNotasFiscais();
        const vendedorTemNotaFiscal = listNotasFiscais.find(n => n.vendedor === vendedor);
        if (vendedorTemNotaFiscal) {
            throw new Error("Não pode deletar vendedor com nota fiscal vinculada");
        }
        this.vendedorRepository.removerVendedor(id);
    }

    listaTodasNotasFiscaisVendedor(id: number): NotaFiscal {
        const vendedor = this.vendedorRepository.buscarPorID(id);
        const listNotasFiscais = this.notaFiscalRepository.listarNotasFiscais();
        const vendedorTemNotaFiscal = listNotasFiscais.find(n => n.vendedor === vendedor);
        if (!vendedorTemNotaFiscal){
            throw new Error("Vendedor não tem notas fiscais.");
        }
        return vendedorTemNotaFiscal;
    }
}
