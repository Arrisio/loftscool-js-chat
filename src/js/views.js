import indexRender from '../templates/index.hbs';
import chatRender from '../templates/chat.hbs';
import authRender from '../templates/auth.hbs';
import contactsRender from '../templates/contacts.hbs';
import messagesRender from '../templates/messages.hbs';
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
    const msgHtml = messagesRender({messages});
    $('#chat__messages').empty().append(messagesRender({messages}));
};

export {
    renderAuth, renderChat, renderContacts, renderContactInfo,renderMessages
};