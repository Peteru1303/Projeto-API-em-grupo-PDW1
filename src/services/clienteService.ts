import { ClienteRepositorio } from "./../repositories/clienteRepository";
import { Cliente } from "./../models/Cliente";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";
import { NotaFiscal } from "../models/NotaFiscal";

//cadastra um novo cliente
export class ClienteService {
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();
    clienteRepository = ClienteRepositorio.getInstance();

    async cadastrarCliente(cliente: any): Promise<Cliente> {
        const { nome, cpf, telefone, email, cidade } = cliente;
        
        if(!cpf || !nome || !telefone) { //regra 1: IMPLEMENTADO: O campo CPF, nome e telefone sao obrigatorios
            throw new Error ("CPF, nome ou telefone nao inseridos.") ;
        }

        //regra 2: IMPLEMENTADO: Não é permitido cadastrar dois clientes com o mesmo CPF
        let buscarCliente = await this.clienteRepository.buscarPorCPF(cpf);
        if (buscarCliente) {
            throw new Error("CPF digitado já existe");
        }

        const newCliente = new Cliente(null, nome, cpf, telefone, email, cidade);
        
        await this.clienteRepository.inserirCliente(newCliente);

        return newCliente;
    }

    //lista todos os clientes cadastrados
    async listarClientes(): Promise<Cliente[]> {
        let lista = await this.clienteRepository.listarClientes();
        if (!lista) {
            throw new Error("Cliente não encontrado!!");
        }
        return lista;
    }

    //retorna os dados de um cliente pelo id
    async buscarPorID(id: any): Promise<Cliente> {
        let idNumero = Number(id);
        let cliente: Cliente | null = null;


        cliente = await this.clienteRepository.buscarPorID(idNumero);


        // redundacia, o buscarPorID ja percorre a lista
        // if (!cliente) {
        //     let lista = await this.clienteRepository.listarClientes();
        //     cliente = lista.find(p => p.nome.toLowerCase() === String(id).toLowerCase()) || null;
        // }

        if (!cliente) {
            throw new Error("Cliente não encontrado!!");
        }
        return cliente;
    }
    

    async atualizarCliente(ClienteData: any, id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.buscarPorID(id);
        if (!cliente) {
            throw new Error("Cliente não cadastrado!!");
        }

        const { nome, cpf, telefone, email ,cidade } = ClienteData;
        if (!nome || !cpf || !telefone) {
            throw new Error("Novos dados devem conter nome, cpf e telefone");
        }

        await this.clienteRepository.atualizarCliente(ClienteData, id);
        return cliente;
    }

    async removerCliente(id: number): Promise<void> {
        //regra 3: IMPLEMENTADO: Não é permitido remover um cliente que possua notas fiscais vinculadas a ele
        const cliente = await this.clienteRepository.buscarPorID(id);
        if (!cliente) {
            throw new Error("Cliente nao encontrado");
        }
        const listNotasFiscais = await this.notaFiscalRepository.listarNotasFiscais();
        const clienteTemNotaFiscal = listNotasFiscais.find(n => n.cliente === id);
        if (clienteTemNotaFiscal){
            throw new Error("Não pode deletar Cliente com Nota Fiscal Vinculada");
        }
        await this.clienteRepository.removerCliente(id);
    }

     async listarTodasNotasFiscaisCliente(idNFC: number): Promise<NotaFiscal[]> {
        const cliente = await this.clienteRepository.buscarPorID(idNFC);
        if (!cliente) {
            throw new Error("Cliente nao encontrado");
        }
        const listNotasFiscais = await this.notaFiscalRepository.listarNotasFiscais();
        const NotasFiscaisCliente = listNotasFiscais.filter(n => n.cliente === idNFC)
        if (!NotasFiscaisCliente){
            throw new Error("Cliente não tem notas fiscais.");
        }
        return NotasFiscaisCliente;
    }
}
