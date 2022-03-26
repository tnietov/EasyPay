let saldoActual;

function getTransactions(){
    const id = document.getElementById('userId').value;

    fetch('http://localhost:3000/transacciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
            'Accept': '*',
        },
        body: JSON.stringify({ id }),
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

function doTransaction(){

    const id = document.getElementById('userId').value;
    const saldo = document.getElementById('saldo').value;

    fetch('http://localhost:3000/transaccion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Connection': 'keep-alive',
            'Accept': '*',
        },
        body: JSON.stringify({ id, saldo}),
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

function signIn(event){
    const userId = event.elements.userId.value;
    
    fetch(`http://localhost:3000/users/${userId}`, { 
        method: "GET"
    })
    .then( res => res.json() )
    .then( data => {
        if(data.message) console.log("User not found / Verify your credentials")
        else{
            sessionStorage.setItem("user", JSON.stringify(data[0]));
            location.href = "./../Home/index.html"; 
        }
    })
}

window.load = () => {
    const form = document.getElementById("loginForm");
    function handleForm(event) { event.preventDefault();  } 
    form.addEventListener('submit', handleForm);
    
}
