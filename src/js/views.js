import indexRender from  '../templates/index.hbs';
import chatRender from  '../templates/chat.hbs';
import authRender from  '../templates/auth.hbs';
import modalRender from  '../templates/modal.hbs';

let container;

const renderAuth = () => {
    if (!container) {
        container = document.querySelector('.container');
    }
    container.innerHTML = authRender();
};

const renderChat = () => {
    if (!container) {
        container = document.querySelector('.container');
    }
    container.innerHTML = chatRender();
};


export {
    renderAuth, renderChat
};