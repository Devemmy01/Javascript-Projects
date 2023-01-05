const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener('click', e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file  => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download file"
    }).catch(() => {
        downloadBtn.innerText = "Download file"
        alert("Failed to Download file!")
    })
}