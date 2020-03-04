import  * as models from './models';
import * as views from './views'
import registerCustomHelpers from './handlebarsExtras';


registerCustomHelpers();
const applicationState = new  models.ApplicationState();

const authentificate = () => {
    let userLogin, userFio ;
    models.applicationState.authentificate();
    initApplication();
};

const initApplication = () => {
    if (applicationState.isAuthentificated){
        views.renderChat();
    } else {
        views.renderAuth();
        document.getElementById('btnAuth').addEventListener('click', e=> {
            const authForm = document.getElementById('auth__form')
            // models.applicationState.authenticate(authForm.username, authForm.nickname);
            applicationState.authenticate('nn', 'll');
            initApplication();
        })
    }
};


export {
    initApplication,
    authentificate
}