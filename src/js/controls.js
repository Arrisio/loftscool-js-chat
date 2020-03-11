import {applicationState, Contact, completeMsg} from './models';
import * as views from './views'
import registerCustomHelpers from './handlebarsExtras';

// registerCustomHelpers();
const selectedContact = new Contact();

const enterApplication = async () => {
    const containerHtml = document.querySelector('.container');

    if (!applicationState.isAuthentificated) {
        containerHtml.innerHTML = views.renderAuth();
        document.getElementById('btnAuth').addEventListener('click', authenticate);
        return;
    }
    applicationState.authenticate('user1', 'FiOO')
    let contactsDOM, messagesDOM;

    displayChat();
    await displayContacts();
    initSocketEvents();

    await renderAddPhoto();


    async function selectContact() {
        const selectContactLogin = this.dataset.login;
        console.log(selectContactLogin);
        await selectedContact.init(selectContactLogin);
        document.getElementById('chat__contact-info').innerHTML=views.renderContactInfo(selectedContact);

        document.getElementById('chat__messages').innerHTML=views.renderMessages(selectedContact.messages);
        messagesDOM = document.getElementById('messages');

        document.querySelectorAll('.contacts__item_selected').forEach(
            elt => {
                elt.classList.remove('contacts__item_selected')
            }
        );

        this.classList.add("contacts__item_selected");
    }


    function initSocketEvents() {

        applicationState.socket.on(['confirmMsg'], data => {
            completeMsg(data);
            const msgDOM = createEltFromHTML(views.renderMsg(data));
            document.getElementById('messages').prepend(msgDOM);
        });

        applicationState.socket.on(['newMsg'], data => {
            completeMsg(data);

            const msgDOM = createEltFromHTML(views.renderResponse(data));
            messagesDOM.prepend(msgDOM);
        });

        applicationState.socket.on(['updateUser'], data => {
            applicationState.contacts[data.login] = data;
            console.log('updateUser', data);
            if (!data) {
                console.log(`cant update user - not register`);
                console.log(data);
                return;
            }
            const contactDOMPrev = document.getElementById(`contacts__item-${data.login}`);
            const contactDOM = createEltFromHTML(views.renderContact(data));
            contactDOM.addEventListener('click', selectContact);

            if (contactDOMPrev) {
                contactDOMPrev.parentNode.replaceChild(contactDOM, contactDOMPrev);
            } else {
                contactsDOM.appendChild(contactDOM);
            }

            document.querySelectorAll(`.contact__photo-${data.login}`)
                .forEach(img => {
                    img.src = data.photo;
                    console.log(img)
                });
        });

    }


    function displayChat() {
        containerHtml.innerHTML = views.renderChat();
        document.getElementById('btnSendMsg').addEventListener('click', async e => {
            const msgElement = document.getElementById('message-to-send');
            if (msgElement.value && selectedContact.login) {
                selectedContact.sendMessage(msgElement.value);
                msgElement.value = '';
            }
        });

    }

    async function displayContacts() {
        await applicationState.getContacts();
        document.getElementById('people-list__contacts').innerHTML = views.renderContacts(applicationState.contacts);
        contactsDOM = document.getElementById('contacts');
        document.querySelectorAll('.contacts__item').forEach(
            elt => {
                elt.addEventListener('click', selectContact)
            }
        );
    }
};


const authenticate = () => {
    const login = document.getElementById('authLogin').value;
    const fio = document.getElementById('authFio').value;
    if (!(login && fio)){
        alert('имя и логин должны быть заполнены');
        return
    }
    applicationState.authenticate(login, fio);
    enterApplication();
};


async function renderAddPhoto() {
    var modal = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector("#cancelPhoto");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);


    const
        photoInput = document.getElementById('photoInput'),
        thePhoto = document.getElementById('thePhoto'),
        fileReader = new FileReader();
    let photoFile;

    photoInput.addEventListener('change', e => {
        [photoFile] = e.target.files;
        if (photoFile) {
            if (photoFile.size > 512 * 1024) {
                alert('слишко большой файл');
            } else {
                fileReader.readAsDataURL(photoFile);
            }
        }
    });

    fileReader.addEventListener('load', () => {
            thePhoto.src = fileReader.result;
        }
    );

    document.getElementById('savePhoto').addEventListener('click', () => {
        applicationState.socket.emit('updateUserPhoto', {
            photo: fileReader.result
        })
    })

}


function createEltFromHTML (htmlString){
    const placeholder = document.createElement('div');
    placeholder.innerHTML = htmlString;
    return placeholder.firstElementChild;
}
export {
    enterApplication,
    authenticate
}