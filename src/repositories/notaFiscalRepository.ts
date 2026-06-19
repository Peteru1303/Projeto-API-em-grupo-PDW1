import { NotaFiscal } from "./../models/NotaFiscal";

export class NotaFiscalRepositorio {
    private static instance: NotaFiscalRepositorio;
    private NotaFiscalList: NotaFiscal[] = [];

    private constructor() { };

    public static getInstance(): NotaFiscalRepositorio {
        if (!this.instance) {
            this.instance = new NotaFiscalRepositorio();
        }
        return this.instance;
    }

    inserirNotaFiscal(NotaFiscal: NotaFiscal): void {
        this.NotaFiscalList.push(NotaFiscal);
    }

    listarNotasFiscais(): NotaFiscal[] {
        return this.NotaFiscalList;
    }

    listarNotasFiscaisVendedor(id: number): NotaFiscal[] {
        const listNotasFiscais = this.listarNotasFiscais();

        const listaVendedorNFC = listNotasFiscais.filter(n => n.vendedor === id);

        return listaVendedorNFC;
    }

    buscarPorID(id: number): NotaFiscal | undefined {
        return this.NotaFiscalList.find(nota => nota.id === id);
    }

    buscarPorNumeroNota(numero_nota: string): NotaFiscal | undefined {
        return this.NotaFiscalList.find(notaFiscal => notaFiscal.numero_nota === numero_nota);
    }

    buscarPorNumeroNotaCliente(cliente_id: number): NotaFiscal | undefined {
        return this.NotaFiscalList.find(notaFiscal => notaFiscal.cliente === cliente_id);
    }

    buscarPorNumeroNotaVendedor(vendedor_id: number): NotaFiscal | undefined {
        return this.NotaFiscalList.find(notaFiscal => notaFiscal.vendedor === vendedor_id);
    }

    buscarPorNumeroNotaCarro(carro_id: number): NotaFiscal | undefined {
        return this.NotaFiscalList.find(notaFiscal => notaFiscal.carro === carro_id);
    }

    atualizarNotaFiscal(NotaFiscalData: any, id: number): void {
        const index = this.NotaFiscalList.findIndex(nota => nota.id === id);

        if (index !== -1) {
            this.NotaFiscalList[index].numero_nota = NotaFiscalData.numero_nota;
            this.NotaFiscalList[index].data_emissao = NotaFiscalData.data_emissao;
            this.NotaFiscalList[index].valor_total = NotaFiscalData.valor_total;
            this.NotaFiscalList[index].cliente = NotaFiscalData.cliente;
            this.NotaFiscalList[index].vendedor = NotaFiscalData.vendedor;
            this.NotaFiscalList[index].carro = NotaFiscalData.carro;
        }
    }

    removerNotaFiscal(id: number): void {
        const index = this.NotaFiscalList.findIndex(nota => nota.id === id);

        if (index !== -1) {
            this.NotaFiscalList.splice(index, 1);
        }
    }
}
