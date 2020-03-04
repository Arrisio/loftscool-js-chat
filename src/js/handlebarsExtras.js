import hbs from 'handlebars';

export function registerCustomHelpers () {
    Handlebars.registerHelper(
        'getTime',
        fecha => new Date(fecha).toLocaleTimeString()
    )
}
