

function discussionPage() {
    const nom = document.getElementById('txtNom').value
    if(nom == ""){
        alert("Veuillez entrer votre nom")
        return;
    }
    localStorage.setItem("user", nom )
    location.href = "discussion.html";
}

function logout(){
    localStorage.removeItem("user")
    location.href = "index.html";
}

function myPersonalWebSite() {
    location.href = "https://Joshua1418.github.io/JosueNzanza/";
}
let showUp = false;
function openNav() {
    document.getElementById("navBox").style.height = showUp?
     "0vh" : "30vh"
    showUp = !showUp;
}

document.onreadystatechange = function(){
    if(document.readyState == "complete"){
    }
    readMessage()
}

async function readMessage(){ 
    const res = await fetch("http://localhost:4000/messages")
    const data = await res.json();
    document.getElementById("discussion").innerHTML = ""
    data.forEach(content => {
        document.getElementById("discussion").innerHTML += `
        <div class="discussion-box">
                <p style="font-size: 1.5rem; padding-bottom: 0.6em;color: black;">${content.nom}</p>
                <p id="text-message">${content.message}</p>
                <div class="trash-box"><img src="trash.png" alt="trash" onclick="messageDelete(${content.id})"></div>
        </div>`
    });
}

async function addMessage(){ 
    
    const message = document.getElementById("message").value
    if (message == "" ){
       return
    }
    await fetch("http://localhost:4000/add",{
         method: "POST",
         body: JSON.stringify({ 
            nom :  localStorage.getItem("user"),
            message : message
        }),
        headers : {"Content-type" : "application/json; charset=UTF-8"}
     })
    document.getElementById("message").value = ""
    readMessage()
}

async function messageDelete(id){
    await fetch("http://localhost:4000/delete",{
        method: "POST",
        body: JSON.stringify({
            id:id
        }),
        headers : {"Content-type" : "application/json; charset=UTF-8"}
    })
    readMessage()
}
