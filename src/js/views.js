import indexRender from '../templates/index.hbs';
import chatRender from '../templates/chat.hbs';
import authRender from '../templates/auth.hbs';
import contactsRender from '../templates/contacts.hbs';
import contactRender from '../templates/contact.hbs';
import messagesRender from '../templates/messages.hbs';
import msgRender from '../templates/message.hbs';
import responseRender from '../templates/message-response.hbs';
import contactInfoRender from '../templates/contact-info.hbs';

import handlebarsExtras from './handlebarsExtras';
handlebarsExtras();
console.log(Handlebars);

const renderAuth = () => {
    return authRender()
};

const renderChat = () => {
    return chatRender()
};

const renderContacts = (contacts) => {
    return contactsRender({contacts})
};

const renderContact = (contact) => {
    return contactRender(contact);
};


const renderContactInfo = (contact) => {
    return contactInfoRender(contact)
};

const renderMessages = (messages) => {
    return messagesRender({messages})
};

const renderMsg = (msgTxt) =>{
    return msgRender(msgTxt)
};

const renderResponse = (msgTxt) =>{
    return responseRender(msgTxt)
};

export {
    renderAuth, renderChat, renderContacts, renderContact, renderContactInfo,renderMessages, renderResponse, renderMsg
};