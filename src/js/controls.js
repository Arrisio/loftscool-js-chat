import {applicationState, Contact} from './models';
import * as views from './views'
import registerCustomHelpers from './handlebarsExtras';



registerCustomHelpers();
const selectedContact = new Contact();

const enterApplication = async () => {
    if (!applicationState.isAuthentificated) {
        views.renderAuth();
        document.getElementById('btnAuth').addEventListener('click', authenticate);
        return;
    }


    views.renderChat();
    await applicationState.getContacts();
    views.renderContacts(applicationState.contacts);

    $('.contacts__item').click(async e => {
        const selectContactLogin = e.delegateTarget.querySelector('.contact').dataset.login;
        await selectedContact.init(selectContactLogin);
        views.renderContactInfo(selectedContact);
        views.renderMessages(selectedContact.messages);
    });

};


const authenticate = () => {
    const authForm = document.getElementById('auth__form');
    applicationState.authenticate(authForm.login, authForm.pwd);
    enterApplication();
};

export {
    enterApplication,
    authenticate
}