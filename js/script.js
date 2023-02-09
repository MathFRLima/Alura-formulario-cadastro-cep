/* var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json')
APRENDENDO A USAR THEN(ENTÃO), QUANDO O RETORNO É TRUE QUE SEMPRE É ACOMPANHADO DE UMA
ARROW FUNCTION, AS CALLBACK(FUNCÕES QUE CHAMAM OUTRAS FUNÇÕES), 
MAS É DE DIFICIL LEITURA, POIS ENCHE DE CALLBACK.

THROW ERROR É PARA MODIFICAR A MENSAGEM DE ERROR PADRÃO DA API

CATCH(PEGUE) É QUANDO O RETORNO É FALSE, VAI "PEGAR" O RETORNO E FAZER
O QUE A CALLBACK "DISSER"

FINALLY(FINALMENTE) VAI FINALIZAR A REQUISIÇÃO DA API (FINALIZAR A 
PROMISE) E MOSTRAR UMA MESAGEM ATRAVÉS DA CALLBACK

    .then(resposta => resposta.json())
    .then(r => {
        if(r.erro) {
            throw Error('Esse CEP não existe!')
        }else {
            console.log(r)
        }
    })
    .catch(erro => console.log(erro))
    .finally(mensagem => console.log('Processamento concluído')) */

/*  OUTRA FORMA DE FAZER, ASYNC AWAIT FACILITA A LEITURA DE FUNÇÃO ASSINCRONA*/
async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ''
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        var consultaCEPConvertida = await consultaCEP.json()
            if(consultaCEPConvertida.erro) {
            throw Error('CEP não existente!')
            }
            var cidade = document.getElementById('cidade')
            var logradouro = document.getElementById('endereco')
            var estado = document.getElementById('estado')
            var bairro = document.getElementById('bairro')

            cidade.value = consultaCEPConvertida.localidade
            logradouro.value = consultaCEPConvertida.logradouro
            estado.value = consultaCEPConvertida.uf
            bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = '<p>CEP Inválido. Tente novammente.</p>'
        console.log(erro)
    }
}
/* como funciona o promiseALL
let ceps = ['01001000', '01001001']
let conjutoCeps = ceps.map(valores => buscaEndereco(valores))
Promise.all(conjutoCeps).then(respostas => console.log(respostas))
 */

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
