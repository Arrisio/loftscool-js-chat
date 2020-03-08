// import './styles/style.scss';
import './styles/styles.scss';
import * as controls from './js/controls';
import logoImg from './images/logo.png'
// import initChat from './js/chat'


window.onload = controls.enterApplication();
// window.onload = initChat();

function renderAddPhoto (){
    var modal = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");

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
}
renderAddPhoto();