import chalk from "chalk"

function extrairLinks(arrLista) {
    return arrLista.map((objlink) => Object.values(objlink).join())
}

function remanejarErro(error){
    if (error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado'
    }else{
        return 'Outro erro'
    }
}

async function statusLinks(arrLinks) {
    const resultados = await Promise.all(
        arrLinks.map(async(url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (error) {
              return remanejarErro(error)
            }

        })
    )
    return resultados
}


export default async function listaValidada(lista) {
    const arrLinks = extrairLinks(lista)
    const status = await statusLinks(arrLinks)
    return lista.map((obj, indice) => ({...obj,status: status[indice]}))
}
