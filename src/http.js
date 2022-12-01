
function extraiLinks(arrLinks) {
    return arrLinks.map((objLinks) => Object.values(objLinks).join())
}
async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;
            } catch (error) {
                return manejaErros(error)
            }
        })
    )
    return arrStatus
}
function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado'
    }else{
        return 'Ocorreu algum erro'
    }
}
export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links)
    return listaDeLinks.map((obj, indice) => ({
        ...obj,
        status: status[indice]
    }))
}