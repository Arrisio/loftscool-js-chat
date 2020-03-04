import  {applicationState, messages} from './models';
import * as views from './views'

const authentificate = () => {
    let userLogin, userFio ;
    applicationState.authentificate();
    initApplication();
};

const initApplication = () => {
    if (applicationState.isAuthentificated){
        views.renderChat();
    } else {
        views.renderAuth();
        document.getElementById('')
    }
};


export {
    initApplication,
}