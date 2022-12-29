function extrairLinks(listas) {
    return listas.map((obj) => Object.values(obj).join());
}

async function verificarLinks(arrayLinks) {
    return await Promise.all(
        arrayLinks.map(async (url) => {
            try {
                const res = await fetch(url);
                return res.status;
            } catch (error) {
                if (error.cause.code === 'ENOTFOUND') {
                    return `Link não encontrado!.`
                } else {
                    return `Não foi possivel identificar o erro!.`
                }
            }
        })

    )

}

async function validarLinks(listas) {
    const arrayLinks = extrairLinks(listas)
    const texto = await verificarLinks(arrayLinks)
    return listas.map((obj, indice) => ({
        ...obj,
        Status: texto[indice]
    }))
}

export default validarLinks;