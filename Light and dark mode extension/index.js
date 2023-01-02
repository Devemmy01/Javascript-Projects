if(document.querySelector(".popup")){
    const button = document.querySelector('.button');
    const circle = document.querySelector('.circle');

    let buttonOn = false;

    button.addEventListener('click', () => {
        if(!buttonOn){
            buttonOn = true;
            circle.style.animation = "moveCircleRight 1s forwards";
            button.style.animation = "bgcolor 1s forwards";
            chrome.tabs.executeScript({
                file: "appOn.js"
            })
        } else{
            buttonOn = false;
            circle.style.animation = "moveCircleleft 1s forwards";
            button.style.animation = "bgcolorr 1s forwards";
            chrome.tabs.executeScript({
                file: "appOff.js"
            })
        }
    })
}

