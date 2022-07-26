# Autenticação de Login

> ## Dados

* Usuario
* Senha

> ## Fluxo Primario

1. Obter dados(Usuario, Senha)
2. Consultar se Existe um usuário com o usuário recebido acima
3. Criar um token de acesso apartir do ID do usuário, com expiração de 12 horas
4. Retornar o token de acesso gerado

> ## Fluxos de execeção: Token invalido ou expirado, Usuário ou senha inválidos

1. Retornar um erro de autenticação
2. Retornar um erro de dados inválidos ou não existentes no repositório
