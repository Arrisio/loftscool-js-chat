import indexRender from  '../templates/index.hbs';
import chatRender from  '../templates/chat.hbs';
import authRender from  '../templates/auth.hbs';
import modalRender from  '../templates/modal.hbs';

function initChat () {
    // wrapperRender();
    const container = document.querySelector('.container');
    // container.innerHTML = chatRender();
    container.innerHTML = authRender();
    // let modal = document.createElement('div');
    // container.innerHTML = modalRender();
    // document.body.appendChild(modal);
};

export {
    initChat
};