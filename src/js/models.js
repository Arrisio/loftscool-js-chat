import axios from 'axios';

const applicationState = {
    isAuthentificated: false,
    userFio: '',
    userLogin: '',
    allUsers: [],


    authentificate: () => {
        this.isAuthentificated = true;
    },

    getAllUsers: async () => {
        this.allUsers = await axios.get('http:127.0.0.1:3000/users/');
    },


};


const messages = {
    messagesWithChoosenUser: [],
    getMessagesWithUser: async userLogin => {
        this.messagesWithChoosenUser = await axios.get('http:127.0.0.1:3000/messages/', {
            params: {
                user: userLogin
            }
        });
    },
};

export {
    applicationState,
    messages
}