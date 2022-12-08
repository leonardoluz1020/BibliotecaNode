function extrairLinks(lista) {
    return lista.map((chave) => Object.values(chave).join())
}

function remanejarErro(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return `Link não encontrado!`
    } else {
        return `Algo deu errado!`
    }
}

async function statusLinks(arrLinks) {
    return await Promise.all(
        arrLinks.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (error) {
                return remanejarErro(error)
            }
        })
    )
}


export default async function listaValidada(lista) {
    const arrLinks = extrairLinks(lista)
    const status = await statusLinks(arrLinks)
    return lista.map((obj,indice) => ({
        ...obj,
        Status: status[indice]
    }))
}
