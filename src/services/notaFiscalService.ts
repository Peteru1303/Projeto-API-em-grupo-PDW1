import { NotaFiscal } from "../models/NotaFiscal";
import { EstoqueRepositorio } from "../repositories/estoqueRepository";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";
import { ClienteRepositorio } from "../repositories/clienteRepository";
import { VendedorRepositorio } from "../repositories/vendedorRepository";
/* Estava estruturando pq confundi com o carro kk ai ficou assim, 
mas da para usar para continuar */

export class NotaFiscalService {
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();
    estoqueRepository = EstoqueRepositorio.getInstance();
    clienteRepository = ClienteRepositorio.getInstance();
    vendedorRepository = VendedorRepositorio.getInstance();

    async cadastrarNotaFiscal(notaFiscal: any): Promise<NotaFiscal> {
        const { numero_nota, data_emissao, valor_total, cliente, vendedor, carro } = notaFiscal

        //Regra 1: Uma nota fiscal somente pode ser emitida se o carro associado possuir quantidade > 0 em estoque.
        //Ao emitir, a quantidade em estoque é automaticamente decrementada em 1 unidade.

        const listEstoque = await this.estoqueRepository.listarEstoque(); //Faz a listagem do estoque
        const estoqueCarro = listEstoque.find(e => e.carro === carro); //Acha o estoque do carro associado

        if (estoqueCarro && estoqueCarro.quantidade <= 0) { //Verifica se o estoque tem o carro e se tem quantidade
            throw new Error("Precisa ter um carro no estoque");
        }

        //Após a emissão da nota, o estoque do carro deve ser atualizado, diminuindo a quantidade em 1


        //Regra 2: O campo numero_nota é obrigatório e deve ser único no sistema.

        let buscarNumNota = await this.notaFiscalRepository.buscarPorNumeroNota(numero_nota);
        if (buscarNumNota) {
            throw new Error("O numero da nota fiscal já existe");
        }

        //Regra 3: O campo valor_total deve ser positivo e maior que zero.
        if (valor_total < 0) {
            throw new Error("O valor total deve ser maior que zero");
        }

        //Regra 4: Os campos id_cliente, id_vendedor e id_carro são obrigatórios e devem referenciar registros
        //existentes no sistema.

        const listCliente = await this.clienteRepository.listarClientes();
        const clienteNotaFiscal = listCliente.find(c => c.id === cliente);

        const listVendedor = await this.vendedorRepository.listarVendedor();
        const vendedorNotaFiscal = listVendedor.find(v => v.id === vendedor);

        //reutilizando a pesquisa de carro da regra 1 para definir a booleana estoqueCarro
        if (!clienteNotaFiscal || !vendedorNotaFiscal || !estoqueCarro || !carro || !vendedor || !cliente) {
            throw new Error("Os campos cliente, vendedor e carro são obrigatórios e devem ter registro no sistema");
        }

        //Regra 5: A data_emissao não pode ser uma data futura em relação à data atual do servidor.
        if (data_emissao > Date.now()) {
            throw new Error("A data de emissão tem que ser a data atual ou uma data anterior à atual")
        }

        const newNotaFiscal = new NotaFiscal(null, numero_nota, data_emissao, valor_total, cliente, vendedor, carro); 

        this.notaFiscalRepository.inserirNotaFiscal(newNotaFiscal)

        await this.DecrementarEstoqueCarro(carro);

        return newNotaFiscal;
    }

    //lista todos os clientes cadastrados
    async listarNotasFiscais(): Promise<NotaFiscal[]> {
        let lista = await this.notaFiscalRepository.listarNotasFiscais();
        if (!lista) {
            throw new Error("Lista de Nota Fiscal não encontrada!!\n");
        }
        return lista;
    }
    
    async buscarPorID(id: any): Promise<NotaFiscal> {
        let lista = await this.notaFiscalRepository.listarNotasFiscais();
        let idNumero = Number(id);
        let notaFiscal = lista.find(p => p.id === idNumero);
        if (!notaFiscal) {
            throw new Error("Nota Fiscal não encontrada!!\n");
        }
        return notaFiscal;
    }

    async DecrementarEstoqueCarro(carro: any): Promise<void> {
        const listEstoque = await this.estoqueRepository.listarEstoque();
        const estoqueCarro = listEstoque.find(e => e.carro === carro);

        if (estoqueCarro) {
            estoqueCarro.quantidade -= 1;
        }
    }
}
