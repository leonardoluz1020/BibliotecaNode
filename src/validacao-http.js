function extrairLinks(listas) {
    return listas.map((objLinks) => Object.values(objLinks).join());
}

async function statusLinks(arrayLinks) {
    return await Promise.all(
        arrayLinks.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (error) {
                if (error.cause.code === 'ENOTFOUND') {
                    return `Link não encontrado!.`
                }else {
                    return `Não foi possivel identificar o erro!.`
                }
            }
        })
    )
}

async function validarLinks(listas) {
    const arrayLinks = extrairLinks(listas);
    const status = await statusLinks(arrayLinks);
    return listas.map((obj, indice) => ({
        ...obj,
        Status: status[indice]
    }))
}
export default validarLinks;