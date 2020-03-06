import {applicationState, Contact, completeMsg} from './models';
import * as views from './views'
import registerCustomHelpers from './handlebarsExtras';


applicationState._initChatConnection();

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
    views.renderContacts(applicationState.contactList);

    $('.contacts__item').click(async e => {
        const selectContactLogin = e.delegateTarget.querySelector('.contact').dataset.login;
        await selectedContact.init(selectContactLogin);
        views.renderContactInfo(selectedContact);
        views.renderMessages(selectedContact.messages);
    });

    $('#btnSendMsg').click(async e => {
        const msgText = $('#message-to-send').val() ;
        if (msgText && selectedContact.login) {
            selectedContact.sendMessage(msgText);
            $('#message-to-send').val('');
        }
    });

    applicationState.socket.on(['confirmMsg'], data => {
        completeMsg(data);
        console.log(data);
        views.renderResponse(data);
    });

    applicationState.socket.on(['newMsg'], data => {
        completeMsg(data);
        views.renderMsg(data);
    })


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