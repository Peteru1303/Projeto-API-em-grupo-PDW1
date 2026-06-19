import { Vendedor } from "../models/Vendedor";
import { VendedorRepositorio } from "../repositories/vendedorRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/NotaFiscal";

export class VendedorService {
    vendedorRepository = VendedorRepositorio.getInstance();
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    async cadastrar(vendedor: any): Promise<Vendedor> {
        const { nome, matricula, comissao_percentual } = vendedor
        
        if(!nome || !matricula || !comissao_percentual) {
            throw new Error ("Informacoes incompletas");
        }

        if (comissao_percentual < 0 || comissao_percentual > 30) {
            throw new Error("A comissao percentual deve ser entre 0 e 30.")
        }

        // let lista = this.vendedorRepository.listarVendedor();
        let existeMatricula = await this.vendedorRepository.existeMatricula(matricula);
        
        /* lista.find(v => v.matricula === matricula); */ //CORRIGIDO para verificar se já existe um vendedor com a mesma matrícula, pois a matrícula deve ser única para cada vendedor. Antes estava verificando se já existia um vendedor com o mesmo nome, mas o nome pode ser repetido, o que não é um problema. O que não pode ser repetido é a matrícula, pois ela é o identificador único do vendedor.
        if (existeMatricula) {
            throw new Error("Já existe esse numero de matricula") //CORRIGIDO para lançar um erro específico quando já existe um vendedor com a mesma matrícula, para que o controller possa tratar esse erro e retornar uma resposta adequada para o cliente. Antes estava lançando um erro genérico, o que dificultava a identificação do problema e a resposta adequada para o cliente.
        }

        const newVendedor = new Vendedor(null, nome, matricula, comissao_percentual);

        await this.vendedorRepository.novoVendedor(newVendedor)

        return newVendedor;
    }

    async listarVendedor(): Promise<Vendedor[]> {
        let lista = await this.vendedorRepository.listarVendedor();
        if (!lista) {
            throw new Error("Vendedor não encontrado!!");
        }
        return lista;
    }

    async buscarPorID(id: any): Promise<Vendedor> {
        
        let idNumero = Number(id);
        // correção e refatoração (quem tem q percorrer a lista, e o repository)
        let vendedor = await this.vendedorRepository.buscarPorID(idNumero);
        // let vendedor = lista.find(v => v.id === idNumero);

        // não precisa disso, por que o proprio buscarPorID ja esta percorrendo a lista no repository
        // let lista = this.vendedorRepository.listarVendedor();
        // if (!vendedor) {
        //     vendedor = lista.find(v => v.nome.toLowerCase() === String(id).toLowerCase());
        // }

        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        return vendedor;
    }

    async atualizarVendedor(vendedorData: any, id: number): Promise<Vendedor> {
        const vendedor = await this.vendedorRepository.buscarPorID(id);
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
        let vendedorAtualizado = await this.vendedorRepository.atualizarVendedor(vendedorData, id);
        return vendedorAtualizado;
    }

    async removerVendedor(id: number): Promise<void> {
        const vendedor = await this.vendedorRepository.buscarPorID(id);
        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        //Adicionar condicional que não permite remover um vendedor que possua notas fiscais vinculadas a ele.
        // const listNotasFiscais = this.notaFiscalRepository.listarNotasFiscais();
        const vendedorTemNotaFiscal = await this.notaFiscalRepository.buscarPorNumeroNotaVendedor(id)
        // const vendedorTemNotaFiscal = listNotasFiscais.find(n => n.vendedor === id);
        if (vendedorTemNotaFiscal) {
            throw new Error("Não pode deletar vendedor com nota fiscal vinculada");
        }else {
            await this.vendedorRepository.removerVendedor(id);
        }
    }

    async listaTodasNotasFiscaisVendedor(id: number): Promise<NotaFiscal[]> {

        const vendedor = await this.vendedorRepository.buscarPorID(id);
        if (!vendedor) {
            throw new Error("Vendedor nao encontrado");
        }
        // const listNotasFiscais = await this.notaFiscalRepository.listarNotasFiscais();
        // // const vendedorTemNotaFiscal = await this.notaFiscalRepository.buscarPorNumeroNotaVendedor(id);
        // const vendedorTemNotaFiscal = listNotasFiscais.filter(n => n.vendedor === idNFV);
        // if (!vendedorTemNotaFiscal){
        //     throw new Error("Vendedor não tem notas fiscais.");
        // }

        const listaNotaFiscalVendedor = await this.notaFiscalRepository.listarNotasFiscaisVendedor(id);
        if (!listaNotaFiscalVendedor){
            throw new Error("Vendedor não tem notas fiscais.");
        }

        
        return listaNotaFiscalVendedor;
    }
}
