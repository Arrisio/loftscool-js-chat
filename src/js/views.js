import indexRender from '../templates/index.hbs';
import chatRender from '../templates/chat.hbs';
import authRender from '../templates/auth.hbs';
import contactsRender from '../templates/contacts.hbs';
import messagesRender from '../templates/messages.hbs';
import msgRender from '../templates/message.hbs';
import responseRender from '../templates/message-response.hbs';
import contactInfoRender from '../templates/contact-info.hbs';

const renderAuth = () => {
    $('.container').empty().append(authRender());
};

const renderChat = () => {
    $('.container').empty().append(chatRender())
};

const renderContacts = (contacts) => {
    $('#people-list__contacts').empty().append(contactsRender({contacts}))
};
const renderContactInfo = (contact) => {
    $('#chat__contact-info').empty().append(contactInfoRender(contact))
};

const renderMessages = (messages) => {
    $('#chat__messages').empty().append(messagesRender({messages}));
    _scrollToBottom();
};

const renderMsg = (msgTxt) =>{
    $('#messages').append(msgRender(msgTxt));
    _scrollToBottom();
};

const renderResponse = (msgTxt) =>{
    const $chatHistory = $('#messages');
    $('#messages').append(responseRender(msgTxt));
    _scrollToBottom();
};

const _scrollToBottom = function() {
    const $chatHistory = $('#chat__messages');
    $chatHistory.scrollTop($chatHistory[0].scrollHeight);
};


export {
    renderAuth, renderChat, renderContacts, renderContactInfo,renderMessages, renderResponse, renderMsg
};