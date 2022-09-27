# Salvar Cliente / responsavel

> ## Dados

* nome
* cpf
* identidade
* orgao_emissor
* grau_de_parentesco
* telefone01
* telefone02
* endereco
* numero
* complemento
* cep
* bairro
* cidade
* uf
* email

> ## Fluxo primario

1. Informado os dados de um cliente / responsavel
2. O sistema deverá validar todos os campos e salvar na base
3. retornar os dados do cliente / responsavel correspondente

> ## Fluxo de exceção: Cidadão não encontrado, Cpf inválido

1. Retornar um erro de cliente já cadastrado na base
