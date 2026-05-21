import { Produto } from "./../model/Produto";

export class ProdutoRepositorio {
    private static instance: ProdutoRepositorio;
    private produtoList: Produto[] = [];

    private constructor() { };

    public static getInstance(): ProdutoRepositorio {
        if (!this.instance) {
            this.instance = new ProdutoRepositorio();
        }
        return this.instance;
    }

    novoProduto(produto: Produto): void {
        this.produtoList.push(produto);
    }


    listarProdutos(): Produto[] {
        return this.produtoList;
    }

    buscarPorID(id: number): Produto | undefined {
        return this.produtoList.find(product => product.id === id);
    }

    atualizarProduto(produtoData: any, idAlt: number): void {
        let produto: Produto | undefined = this.buscarPorID(idAlt);

        if (produto) {
            produto.nome = produtoData.nome;
            produto.preco = produtoData.preco;
            produto.fabricante = produtoData.fabricante;
        }
    }

    removerProduto(idRem: number): void {
        let produto: Produto | undefined = this.buscarPorID(idRem);

        if(produto){
            let index = this.produtoList.indexOf(produto);
            this.produtoList.splice(index, 1);
            /* ou pop */
        }
    }
}