const SERVER_URL = 'http://127.0.0.1:3000';

const applicationState = {
    isAuthentificated: false,
    userFio: 'GG II OO',
    userLogin: 'user1',
    // contactList: [],
    contacts: {},
    socket: io.connect(SERVER_URL),

    authenticate: function ( login = '', fio = '') {
        this.isAuthentificated = true;
        this.userLogin = login;
        this.userFio = fio;
        this._initChatConnection();

    },

    getContacts: async function getContacts() {
        await fetch(SERVER_URL + "/users/", {method: "GET"})
            .then(res => res.json())
            .then(res => {
                this.contacts = res;
                });
    },

    _initChatConnection() {
        console.log('init ');
        this.socket.emit('registerConnection', {
            login: this.userLogin,
            fio: this.userFio
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
        this.profile = applicationState.contacts[login];
        if (this.profile) {
            this.fio = this.profile.fio;
            this.photo = this.profile.photo;
        }
        this.fio = this.profile.fio;

        await this.refreshMessages();
    }

    sendMessage(msgText) {
        if (!(applicationState.socket && applicationState.socket.connected)) {
            alert('Connection to chat server is broken');
            return;
        }
        applicationState.socket.emit('initMsg', {
            from: applicationState.userLogin,
            to: this.login,
            msg: msgText
        })
    }

    async refreshMessages() {
        await fetch(`${SERVER_URL}/messages/?user1=${this.login}&user2=${applicationState.userLogin}`)
            .then(res => res.json())
            .then(res => {
                this.messages = res;
                this.messagesNmb = res.length;
                this._completeMsgs();
            });
    }

    _completeMsgs() {
        this.messages.forEach(msg => {
            if (!msg) return;
            console.log(msg);
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