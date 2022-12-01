import fs from 'fs';

function extrairLinks(lista) {
    return lista.map((obj) => Object.values(obj).join())
}
async function validarStatus(arrLinks) {
    const resultados = await Promise.all(
        arrLinks.map(async (url) => {

            try {
                const response = await fetch(url)
                return response.status
            } catch (error) {
                if (error.cause.code === 'ENOTFOUND')
                    return `Link não encontrado !`
                else {
                    return `Não foi possivel identificar o erro!`
                }
            }
        })
    )
    return resultados
}



export default async function listaValidada(lista) {
    const arrLinks = extrairLinks(lista)
    const status = await validarStatus(arrLinks)
    return lista.map((obj, indice) => ({
        ...obj,
        status: status[indice]
    }))
}


/* { chave: valor }, { chave: valor }, { chave: valor },}
      indice 0        indice 1         indice 2
lista.map( ( obj ) => Object.values(obj).join() )

sem join =>  [link] [link] [link]

com join (junte) => [ link, link, link ]


*/