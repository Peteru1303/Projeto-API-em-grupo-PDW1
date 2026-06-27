Concluidomodel notaFiscal, estoque, carro e vendedor:
- Refatorar para tornar mais simples

O repository vendedor foi concluido

Remoção de legado: Apaguei a pasta base antiga e pdf antigo
upload pdf novo

Completei service e controller vendedor
limpei algumas redundancias do cliente
obrigatoriamente tive q adicionar funções no repository do notaFiscal para capturar por exemplo a lista de nota fiscal do cliente ou buscar se notaFiscal existia para aquele cliente


Subi o teste e conclui o notaFiscalController. notaFiscalService 

ajustei repository, service do carro (tinha uma confusão entre inserir e criar, tive q criar o insert e migrar o create para getCreateTableQuery, ajustei erros em cadeia), ajustei nomeclatura do router vendedores, ajustei o mysql q estava faltando criar outras tabelas...

varis erros simples como nomeclatura e etc

alguns erros restante era os complexos por ser mais dificil de achar, mas no fundo ainda era erros desse tipo, nomeclatura: 

Por exemplo o service esperava um nome de campo diferente do que o body manda. o teste manda `id_carro`, `id_cliente`, `id_vendedor` e os services estavam pegando `carro`, `cliente`, `vendedor`, que vinham undefined e derrubavam tudo na validação de "campo obrigatório". ou outros erros de validação como 
"< 0" onde o certo era "<= 0" ou "&&" onde o certo era "||", erros comum concorda meus amigos?

