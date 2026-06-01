//Por Matheus Vieira Ladeia
import { ClienteRepositorio } from "./../repositories/clienteRepository";
import { Cliente } from "./../models/Cliente";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/NotaFiscal";

//cadastra um novo cliente
export class ClienteService {
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();
    clienteRepository = ClienteRepositorio.getInstance();

    cadastrarCliente(cliente: any): Cliente {
        const { nome, cpf, telefone, email, cidade } = cliente;
        
        if(!cpf || !nome || !telefone) { //regra 1: IMPLEMENTADO: O campo CPF, nome e telefone sao obrigatorios
            throw new Error ("CPF, nome ou telefone nao inseridos.") ;
        }

        //regra 2: IMPLEMENTADO: Não é permitido cadastrar dois clientes com o mesmo CPF

        let buscarCliente = this.clienteRepository.buscarPorCPF(cpf);
        if (buscarCliente) {
            throw new Error("CPF digitado já existe");
        }

        const newCliente = new Cliente(cliente.nome, cliente.cpf, cliente.telefone, email, cidade);

        this.clienteRepository.inserirCliente(newCliente);

        return newCliente;
    }

    //lista todos os clientes cadastrados
    listarClientes(): Cliente[] {
        let lista = this.clienteRepository.listarClientes();
         if (!lista) {
            throw new Error("Cliente não encontrado!!");
        }
        return lista;
    }

    //retorna os dados de um cliente pelo id
    buscarPorID(id: any): Cliente {
        let lista = this.clienteRepository.listarClientes();
        let idNumero = Number(id);
        let cliente = lista.find(p => p.id === idNumero);

        if (!cliente) {
            cliente = lista.find(p => p.nome.toLowerCase() === String(id).toLowerCase());
        }

        if (!cliente) {
            throw new Error("Cliente não encontrado!!");
        }
        return cliente;
    }
    

    atualizarCliente(ClienteData: any, idUpdt: number): Cliente {
        const cliente = this.clienteRepository.buscarPorID(idUpdt);
        if (!cliente) {
            throw new Error("Cliente não cadastrado!!");
        }

        const { nome, cpf, telefone, email ,cidade } = ClienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Novos dados devem conter nome, cpf e telefone");
        }

        this.clienteRepository.atualizarCliente(ClienteData, idUpdt);
        return cliente;
    }

    removerCliente(idRem: number): void {

        //regra 3: IMPLEMENTADO: Não é permitido remover um cliente que possua notas fiscais vinculadas a ele
        const cliente = this.clienteRepository.buscarPorID(idRem);
        if (!cliente) {
            throw new Error("Cliente nao encontrado");
        }
        const listNotasFiscais = this.notaFiscalRepository.listarNotasFiscais();
        const clienteTemNotaFiscal = listNotasFiscais.find(n => n.cliente === cliente);
        if (clienteTemNotaFiscal){
            throw new Error("Não pode deletar Cliente com Nota Fiscal Vinculada");
        }
        this.clienteRepository.removerCliente(idRem);
    }

     listarTodasNotasFiscaisCliente(idNFC: number): NotaFiscal {

        const cliente = this.clienteRepository.buscarPorID(idNFC);
        if (!cliente) {
            throw new Error("Cliente nao encontrado");
        }
        const listNotasFiscais = this.notaFiscalRepository.listarNotasFiscais();
        const clienteTemNotaFiscal = listNotasFiscais.find(n => n.cliente === cliente);
        if (!clienteTemNotaFiscal){
            throw new Error("Cliente não tem notas fiscais.");
        }
        return clienteTemNotaFiscal
    }
}
