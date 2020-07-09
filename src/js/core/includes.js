// importando o jQuery
import $, { Callbacks } from 'jquery'

const loadHtmlSuccessCallbacks = []

// Registra funções para registrar no array uma unica vez
// Chamado toda vez que carregar um html de forma bem sucedida
export function onLoadHtmlSuccess(callback) {
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}


function loadIncludes(parent) {
    // Se o parent não tiver setado, procura no body inteiro
    if(!parent) parent = 'body'

    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            //callback chamada se a função for bem sucedida
            success(data) {
                // Insere o resultado objeto dentro do relemento
                $(e).html(data)
                // Remove o include
                $(e).removeAttr('wm-include')

                // invoca cada uma das funções de sucesso
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                // Procura novos includes
                loadIncludes(e)
            }
        })
    })
}

// Passando vazio para usar o body como parent
loadIncludes()