const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # Pontos de entrada da sua API 
    type Query {
        ola: String 
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if(produto.desconto) {
                return produto.preco 
                    * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },

    Usuario: {
        salario(Usuario) {
            return Usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Hello World with graphql'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Artur Barreto',
                email: 'arturdev@email.com',
                idade: 23,
                salario_real: 2500.50,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Macbook Pro',
                preco: 8000.50,
                desconto: 0.15
            }
        } 

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})