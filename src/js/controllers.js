import  * as models from './models';
import * as views from './views'

const authentificate = () => {
    let userLogin, userFio ;
    models.applicationState.authentificate();
    initApplication();
};

const initApplication = () => {
    if (models.applicationState.isAuthentificated){
        views.renderChat();
    } else {
        views.renderAuth();
        document.getElementById('btnAuth').addEventListener('click', e=> {
            const authForm = document.getElementById('auth__form')
            models.applicationState.authentificate(authForm.username, authForm.nickname);
            initApplication();
        })
    }
};


export {
    initApplication,
    authentificate
}