# BackEndFinance2.0
### Iniciou com um Desafio da Alura e vai se tornar o backend de um app.
##

 - Usuario
 - - {X} Criar usuario - post: '/users', body:{name, email, password}
 - - {X} Consultar usuario - get: '/users', body: {id} | {email} | {all: true | false}, cookie: {token} => Array[User]
 - - {X} Alterar usuario - put: '/users/:id', body: {name?, email?, password?}, cookie: {token}
 - - {X} Deletar usuario - delete: '/users/:id', cookie: {token}
 - - {X} Authenticar usuario - get: '/users/:id' => Url enviada para o email!
 - - {X} Login usuario - post: '/users/login', body: {email, password} => retorna no body:{token} e cookie:{token}
 - - {X} Logout usuario - get: '/users/logout', cookie:{token}

 - Categorias
 - - {X} Criar categoria - post: '/api/categories', body: {name, description?}, cookie: {token}
 - - {X} Consultar categoria - get: '/api/categories/?:id', query: {name?, description?}, cookie: {token} => Array de Categorias
 - - {X} Alterar categoria - put: '/api/categories/:id', body: {name?, description?}, cookie: {token}
 - - { } Deletar categoria