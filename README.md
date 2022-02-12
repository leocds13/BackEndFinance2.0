# BackEndFinance2.0
### Iniciou com um Desafio da Alura e vai se tornar o backend de um app.
##

 - Usuario
 - - {X} Criar usuario - post: '/users', body:{name, email, password}
 - - { } Alterar usuario
 - - { } Consultar usuario
 - - { } deletar usuario
 - - {X} Authenticar usuario - get: '/users/:id' => Url enviada para o email!
 - - {X} Login usuario - post: '/users/login', body: {email, password} => retorna no body:{token} e cookie:{token}
 - - {X} Logout usuario - get: '/users/logout', cookie:{token}
