// Getting elements from dom
const artistInput = document.querySelector('#artistName');
const songInput = document.querySelector('#songName');
const from = document.querySelector('#lyricsForm');
const output = document.querySelector('.lyrics-output pre');
const btn = document.querySelector('.fetchBtn');
const loading = document.querySelector('.loading');

//adding a click event to the button
btn.addEventListener('click', () => {
    // check if the fields are not empty
    if(artistInput.value !== "" && songInput.value !== "")
    //show the loading div
    loading.style.opacity = "1"; 

    // Fetching API
    fetch(`https://api.lyrics.ovh/v1/${artistInput.value}/${songInput.value}`
    )
    //Convert API json data to js object
    .then(response => response.json())
    .then(data => {
        if(data.lyrics !== undefined){
            output.innerHTML = data.lyrics;
        } else {
            output.innerHTML = `No lyrics found!`;
        }
        loading.style.opacity = "0";
        document.querySelector('.lyrics-output').style.opacity = "1";
    });
});
