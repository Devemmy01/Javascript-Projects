// async function myFunction() {
//     let response = await fetch('https://jsonplaceholder.typicode.com/todos/')
//     console.log(response);

//     let userData = await response.json();
//     console.log(userData);
// }
// myFunction();

// https://api.github.com/users
async function getGithubusers(){
    let response = await fetch('https://api.github.com/users');
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(data[0].avatar_url);
    console.log(data[0].repos_url);
    let display = "";
    data.map((info) => {
        display += `
            <div class="cards">
                <img src=${info.avatar_url} alt="${info.login}">
                <div class="info">
                    <h1>${info.login}</h1>
                </div>
            </div>`
    })
    document.getElementById("root").innerHTML = display;

    await new Promise((resolve,reject) => {
        setTimeout(resolve, 2000);
    });
}
getGithubusers();
