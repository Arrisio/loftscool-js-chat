// import hbs from 'handlebars';

export default  function  () {
    Handlebars.registerHelper(
        'prettifyDate',
        timestamp => new Date(timestamp).toLocaleTimeString()
    )
}

