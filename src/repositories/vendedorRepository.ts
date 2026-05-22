import { Vendedor } from "../models/Vendedor";

export class VendedorRepositorio {
    private static instance: VendedorRepositorio;
    private vendedorList: Vendedor[] = [];

    private constructor() { };

    public static getInstance(): VendedorRepositorio {
        if (!this.instance) {
            this.instance = new VendedorRepositorio();
        }
        return this.instance;
    }

    novoVendedor(vendedor: Vendedor): void {
        this.vendedorList.push(vendedor);
    }


    listarVendedor(): Vendedor[] {
        return this.vendedorList;
    }

    buscarPorID(id: number): Vendedor | undefined {
        return this.vendedorList.find(vendedor => vendedor.id === id);
    }

    atualizarVendedor(vendedorData: any, idAlt: number): void {
        let vendedor: Vendedor | undefined = this.buscarPorID(idAlt);

        if (vendedor) {
            vendedor.nome = vendedorData.nome;
            vendedor.matricula = vendedorData.matricula;
            vendedor.comissao_percentual = vendedorData.comissao_percentual;
        }
    }

    removerVendedor(idRem: number): void {
        let vendedor: Vendedor | undefined = this.buscarPorID(idRem);

        if(vendedor){
            let index = this.vendedorList.indexOf(vendedor);
            this.vendedorList.splice(index, 1);
            /* ou pop */
        }
    }
    //Adicionar função de retornar as notas fiscais de um vendedor
    //possivelmente reutilizar a função busca id e exportar a nota fiscal do vendedor?
}