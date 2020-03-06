const SERVER_URL = 'http://127.0.0.1:3000';

const applicationState = {
    isAuthentificated: true,
    userFio: '',
    userLogin: 'user1',
    contactList: [],
    contacts: {},
    socket: io.connect(SERVER_URL),

    authenticate: function (userFio = '', userLogin = '') {
        this.isAuthentificated = true;
        this.userFio = userFio;
        this.userLogin = userLogin;
        this._initChatConnection();

    },

    getContacts: async function getContacts() {
        await fetch(SERVER_URL + "/users/", {method: "GET"})
            .then(res => res.json())
            .then(res => {
                this.contactList = res;
                this.contactList.forEach(concact => {
                    this.contacts[concact.login] = concact
                })
            });
    },

    _initChatConnection() {
        this.socket.emit('registerConnection', {userId: this.userLogin});
    }
};

class Contact {
    constructor() {
        this.login = '';
        this.fio = '';
        this.messages = [];
        this.messagesNmb = 0;
    }

    async init(login) {
        if (!login || typeof login !== 'string') throw new Error('Incorrect login while contact initialization');

        this.login = login;
        this.profile = applicationState.contactList.find(contact => contact.login === login);
        if (this.profile) {
            this.fio = this.profile.fio;
            this.photoLink = this.profile.photoLink;
        }
        this.fio = this.profile.fio;

        await this.refreshMessages();
    }

    sendMessage(msgText) {
        applicationState.socket.emit('initMsg', {
            from: applicationState.userLogin,
            to: this.login,
            msg: msgText
        })
    }

    async refreshMessages() {
        await fetch(`${SERVER_URL}/messages/?user=${this.login}`)
            .then(res => res.json())
            .then(res => {
                this.messages = res;
                this.messagesNmb = res.length;
                this._completeMsgs();
            });
    }

    _completeMsgs() {
        this.messages.forEach(msg => {
            msg.userIsAuthor = msg.from === applicationState.userLogin;
            msg.fromFio = applicationState.contacts[msg.from].fio;
            msg.toFio = applicationState.contacts[msg.to];
        })
    }
}

const completeMsg = (msg)=> {
    msg.userIsAuthor = msg.from === applicationState.userLogin;
    msg.fromFio = applicationState.contacts[msg.from].fio;
    msg.toFio = applicationState.contacts[msg.to].fio;
};

export {
    applicationState,
    Contact,
    completeMsg
}