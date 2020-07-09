import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 500

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        // Sendo verdadeira a cidade é exibida, sendo falso a cidade é escondida
        const isTarget = $(this).attr('wm-city') === city || city === null
        if (isTarget) {
            // Ajustando o layout
            $(this).parent().removeClass('d-none')
            // Mostrando as cidades
            $(this).fadeIn(duration)
        } else {
            // Escondendo cidade
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    // Set só permite valores diferentes
    const cities = new Set
    // Adiciona uma cidade para cada nome existente de cidade
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    // Transformando a cidade em um botao
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
        // Evento de clique no botao, chama a função de filtrar por cidade
        btn.click(e => filterByCity(city))
        return btn
    })

    // Adiciona o botão para mostrar todas as fotos e chama a função para mostrar
    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByCity(null))

    // Adiciona o botão para mostrar todos no array de botões
    btns.push(btnAll)

    //Cria uma div de btn-group e adiciona todos os botões a ela
    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)

    return this

}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons()
})

