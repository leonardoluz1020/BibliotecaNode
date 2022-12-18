function extrairLinks(lista) {
    return lista.map((link) => Object.values(link).join())
}
async function verificarStatus(arraLinks){
    return await Promise.all(
        arraLinks.map(async(url)=>{
            try {
                const response = await fetch(url)
                return response.status                
            } catch (error) {
                if(error.cause.code === 'ENOTFOUND'){
                    return `Link não encontrado!.`
                }else{
                    return `Não foi possivel identificar o erro!.`
                }
            }                    
        })
    )
}

export default async function listaValidada(lista) {
    const arraLinks = extrairLinks(lista)
    const status = await verificarStatus(arraLinks)
    return lista.map((obj, indice) => ({
        ...obj,
        Status:status[indice]
    }))
}
