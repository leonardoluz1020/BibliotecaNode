
function extrairLinks(lista){
    return lista.map((objValor) => Object.values(objValor).join())
}

function remanejarErro(error){
    if(error.cause.code === 'ENOTFOUND'){
        return `Link não encontrado`
    }else{
        return `Não foi possivel identificar o erro!`
    }
}

async function validarStatus(arrlinks){
    const resultado = await Promise.all(
        arrlinks.map(async(url) => {
           try {
            const response = await fetch(url)
            return response.status
           } catch (error) {               
            return remanejarErro(error)          
           }
        })
    )
    return resultado
}


export default async function listaValidada(lista){
    const arrlinks = extrairLinks(lista)
    const status = await validarStatus(arrlinks)
    return lista.map((obj, indice) => ({
        ...obj,
        status: status[indice]
    }))
}