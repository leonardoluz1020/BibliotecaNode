function extrairLinks(lista) {
    return lista.map((objLinks) => Object.values(objLinks).join())
}
function remanejarErro(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return `Link não encontrado!.`
    }else{
        return `Não foi possivel identificar o erro!.`
    }
}
async function statusLinks(arrayLinks) {
    return await Promise.all(
        arrayLinks.map(async (url) => {
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
    const arrayLinks = extrairLinks(lista)
    const status = await statusLinks(arrayLinks)  
    return lista.map((obj, indice) => ({
        ...obj,
        Status: status[indice]
    }))
}
