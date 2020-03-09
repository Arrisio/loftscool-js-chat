// import './styles/style.scss';
import './styles/styles.scss';
import * as controls from './js/controls';
import logoImg from './images/logo.png'
// import initChat from './js/chat'


window.onload = controls.enterApplication();

// window.onload = initChat();

function renderAddPhoto() {
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

    fileReader.addEventListener('load', ()=>{
        thePhoto.src = fileReader.result;
        }
    )

    document.getElementById('savePhoto').addEventListener('click', ()=>{
        let formData = new FormData();

        formData.append("photo", photoFile, 'img.png');
        // formData.append("photo", 'AAA ');
        fetch('http://127.0.0.1:3000/photo/', {method: "POST", body: formData});
    })

}

renderAddPhoto();