import indexRender from '../templates/index.hbs';
import chatRender from '../templates/chat.hbs';
import authRender from '../templates/auth.hbs';
import contactsRender from '../templates/contacts.hbs';
import contactRender from '../templates/contact.hbs';
import messagesRender from '../templates/messages.hbs';
import msgRender from '../templates/message.hbs';
import responseRender from '../templates/message-response.hbs';
import contactInfoRender from '../templates/contact-info.hbs';

const renderAuth = () => {
    // $('.container').empty().append(authRender());
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
    console.log(contact);
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

// const _scrollToBottom = function() {
//     const $chatHistory = $('#chat__messages');
//     $chatHistory.scrollTop($chatHistory[0].scrollHeight);
// };


export {
    renderAuth, renderChat, renderContacts, renderContact, renderContactInfo,renderMessages, renderResponse, renderMsg
};