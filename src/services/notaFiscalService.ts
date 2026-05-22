import { NotaFiscal } from "../models/NotaFiscal";
import { NotaFiscalRepositorio } from "../repositories/notaFiscalRepository";

/* Estava estruturando pq confundi com o carro kk ai ficou assim, 
mas da para usar para continuar */

export class NotaFiscalService {
    notaFiscalRepository = NotaFiscalRepositorio.getInstance();

    cadastrarProduto(notaFiscal: any, id: number): NotaFiscal {
        const { numero_nota, data_omissao, valor_total, cliente, vendedor, carro } = notaFiscal
        
        if(!nome || !preco || !fabricante) {
            throw new Error ("Informacoes incompletas") ;
        }

        if (!nome || !preco || !fabricante) {
            throw new Error("Produto requer id, nome, preco e fabricante")
        }

        if (preco <= 0) {
            throw new Error("O preco deve ser maior que zero")
        }

        if (!fabricante.nome || !fabricante.endereco || !fabricante.endereco.cidade || !fabricante.endereco.pais) {
            throw new Error("Fabricante deve conter nome, cidade e pais preenchidos")
        }

        let existe = this.produtoRepository.buscarPorID(id);
        if (existe) {
            throw new Error("Ja existe um produto com este ID")
        }

        let lista = this.produtoRepository.listarProdutos();
        let existeNome = lista.find(p => p.nome.toLowerCase() === nome.toLowerCase());
        if (existeNome) {
            throw new Error("Ja existe um produto com este nome")
        }

        const newProduct = new Produto(id, produto.nome, produto.preco, produto.fabricante);

        this.produtoRepository.novoProduto(newProduct)

        return newProduct;
    }

    listarProdutos(ordem: any): Produto[] {
        let lista = this.produtoRepository.listarProdutos();

        if (ordem === "crescente") {
            let listaOrdenada = [...lista].sort((a, b) => a.preco - b.preco);
            return listaOrdenada;
        }

        if (ordem === "decrescente") {
            let listaOrdenada = [...lista].sort((a, b) => b.preco - a.preco);
            return listaOrdenada;
        }

        return lista;
    }

    buscarPorID(id: any): Produto {
        let lista = this.produtoRepository.listarProdutos();
        let idNumero = Number(id);
        let produto = lista.find(p => p.id === idNumero);

        if (!produto) {
            produto = lista.find(p => p.nome.toLowerCase() === String(id).toLowerCase());
        }

        if (!produto) {
            throw new Error("Produto nao encontrado");
        }
        return produto;
    }

    atualizarProduto(produtoData: any, idAlt: number): Produto {
        const produto = this.produtoRepository.buscarPorID(idAlt);
        if (!produto) {
            throw new Error("Produto nao encontrado");
        }

        const { nome, preco, fabricante } = produtoData;
        if (!nome || !preco || !fabricante) {
            throw new Error("Novos dados devem conter nome, preco e fabricante");
        }
        if (preco <= 0) {
            throw new Error("O preco deve ser maior que zero");
        }
        if (!fabricante.nome || !fabricante.endereco || !fabricante.endereco.cidade || !fabricante.endereco.pais) {
            throw new Error("Fabricante deve conter nome, cidade e pais");
        }

        this.produtoRepository.atualizarProduto(produtoData, idAlt);
        return produto;
    }

    removerProduto(idRem: number): void {
        const produto = this.produtoRepository.buscarPorID(idRem);
        if (!produto) {
            throw new Error("Produto nao encontrado");
        }
        this.produtoRepository.removerProduto(idRem);
    }
}
