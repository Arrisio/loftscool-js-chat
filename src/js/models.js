import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:3000';

const applicationState = {
    isAuthentificated: true,
    userFio: '',
    userLogin: 'user1',
    contacts: [],
    socket: io.connect(SERVER_URL),

    authenticate: function (userFio = '', userLogin = '') {
        this.isAuthentificated = true;
        this.userFio = userFio;
        this.userLogin = userLogin;
    },

    getContacts: async function getContacts() {
        await fetch(SERVER_URL + "/users/", {method: "GET"})
            .then(res => res.json())
            .then(res => {
                this.contacts = res;
            });
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
        this.profile = applicationState.contacts.find(contact => contact.login === login);
        if (this.profile) {
            this.fio = this.profile.fio;
            this.photoLink = this.profile.photoLink;
        }
        this.fio = this.profile.fio;

        await this.refreshMessages();

    }

    async refreshMessages() {
        await fetch(`${SERVER_URL}/messages/?user=${this.login}`)
            .then(res => res.json())
            .then(res => {
                this.messages = res;
                this.messagesNmb = res.length;
                this._defineMessagesAuthor();
            });
    }

    _defineMessagesAuthor() {
        this.messages.forEach( msg => {
            msg.userIsAuthor = msg.from === applicationState.userLogin;
        })
    }
}

export {
    applicationState,
    Contact
}