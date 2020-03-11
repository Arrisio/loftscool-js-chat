// import hbs from 'handlebars';
import Handlebars from 'handlebars';

function registerHelpers  () {
    Handlebars.registerHelper(
        'prettifyDate',
        ts => new Date(ts).toLocaleTimeString()
    )
}

export {
    Handlebars,
    registerHelpers
}

