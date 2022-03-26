(() => {

    if(!sessionStorage.getItem("user"))
        location.href = "./../Login-form/";

    async function getSaldo(id){

        return fetch(`http://localhost:3000/saldo/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => saldoActual = parseInt(data.saldo) || 0);
    }

    async function __loadSessionData() {
        const userData = JSON.parse(sessionStorage.getItem("user"))
        const id = document.querySelector(".id");
        const username = document.querySelector(".username");
        const balance = document.querySelector(".balance");
        const saldo = await getSaldo(userData.id);
        
        id.innerHTML = userData.id;
        balance.innerHTML = "$ " + saldo;
        username.innerHTML = userData.name + " " + userData.surname;
    }

    function __generateNavegableContent() {
        const routes = document.querySelectorAll(".route");
        const views = document.querySelectorAll(".view");

        let currentRoute = window.location.hash.substring(1);

        const resetRoutes  = (event) => {
            currentRoute = event.target.parentNode.dataset.route;
            
            routes.forEach( (route, index) => {
                if(currentRoute === route.dataset.route){
                    route.classList.add("active")
                    views[index].classList.add("show-view")
                }else{ 
                    route.classList.remove("active")
                    views[index].classList.remove("show-view")
                }
            })
        }

        routes.forEach( route => {
            if(currentRoute === route.dataset.route)
                route.classList.add("active")
            else 
                route.classList.remove("active")

            route.innerHTML = `<a href="#${route.dataset.route}" class="route-link" >${route.innerText}</a>`;
            route.firstChild.addEventListener("click", resetRoutes);
        });

        views.forEach( view => {
            if(currentRoute === view.dataset.route)
                view.classList.add("show-view")
            else 
                view.classList.remove("show-view")
        });

    }

    __loadSessionData();
    __generateNavegableContent();
})();

function calculateTotal(){
    const time = document.getElementById("time").value;
    const RATE = 200;
console.log(time)
    const total = document.querySelector(".total");
    total.innerText = `$ ${RATE * time}`;
}

function logout(){
    sessionStorage.removeItem("user");
    location.href = "./../Login-form"
}