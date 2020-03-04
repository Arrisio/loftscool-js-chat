import axios from 'axios';

const applicationState = {
    isAuthentificated: false,
    userFio: '',
    userLogin: '',
    allUsers: [],

    authentificate: (userFio, userLogin) => {
        this.isAuthentificated = true;
        this.userFio = userFio;
        this.userLogin = userLogin;
    },

    // getAllUsers: async () => {
    //     this.allUsers = await axios.get('http:127.0.0.1:3000/users/');
    // },


};


const messages = {
    messagesWithChoosenUser: [],
    // getMessagesWithUser: async userLogin => {
    //     this.messagesWithChoosenUser = await axios.get('http:127.0.0.1:3000/messages/', {
    //         params: {
    //             user: userLogin
    //         }
    //     });
    // },
};

export {
    applicationState,
    messages
}