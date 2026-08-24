const { use } = require("react");

const alertEL = document.querySelector('.alert');

const setAlert = (text = '', type = 'info') => {
    alertEL.textContent = text;
};
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const main = async () => {
    const mainEL = document.querySelector('.root');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        let card = '';

        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            card += `
                <div class="card">

                    <div class="user-header">
                        <h2>${user.name}</h2>
                        <p>@${user.username}</p>
                    </div>

                    <div class="user-details">

                        <div class="detail">
                            <span class="label">Email</span>
                            <span class="value">${user.email}</span>
                        </div>

                        <div class="detail">
                            <span class="label">Phone</span>
                            <span class="value">${user.phone}</span>
                        </div>

                        <div class="detail">
                            <span class="label">Website</span>
                            <span class="value">${user.website}</span>
                        </div>

                        <div class="detail">
                            <span class="label">Address</span>
                            <span class="value1">
                                ${user.address.street},
                                ${user.address.suite},
                                ${user.address.city}
                            </span>
                        </div>

                        <div class="detail">
                            <span class="label">Company</span>
                            <span class="value">${user.company.name}</span>
                        </div>

                    </div>

                </div>
            `;
        }


        mainEL.insertAdjacentHTML('beforeend', card);

    } catch (error) {
        setAlert('Check your work, something is wrong!', 'error');
    }
};
const modeBtn = document.getElementById("modeBtn");

modeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        modeBtn.textContent = "Dark";
    } else {
        modeBtn.textContent = "Light";
    }

});
//let userData =[];
//async function loadData() {
    //userData = await response.json;
    //renderList(userData);    
//}
//document.getElementById('sort-select').addEventListener('change',(event)=>{
   // const selectedvalue = event.target.value;
    //let sorted = [...userData];
   // if (selectedvalue==='name-asc'){
        //sorted.sort((a,b) => a.name.localeCompare(b.name));
   // }else if (selectedvalue=== 'name-desc'){
       // sorted.sort((a,b) => b.name.localeCompare(a.name));
    //}else if (selectedvalue=== 'id-asc'){
        //sorted.sort((a,b) => a.id - b.id);
//}
//renderList(sorted);
//})
//function renderList(data){
    //let output= document.getElementById('results');
    //results.innerHTML = data.map(user => `<div class="card">

                    //<div class="user-header">
                        //<h2>${user.name}</h2>
                        //<p>@${user.username}</p>
                   // </div>

                    //<div class="user-details">

                        //<div class="detail">
                            //<span class="label">Email</span>
                            //<span class="value">${user.email}</span>
                        //</div>

                        //<div class="detail">
                            //<span class="label">Phone</span>
                            //<span class="value">${user.phone}</span>
                       // </div>

                       // <div class="detail">
                            //<span class="label">Website</span>
                            //<span class="value">${user.website}</span>
                        //</div>

                        //<div class="detail">
                            //<span class="label">Address</span>
                           // <span class="value1">
                                //${user.address.street},
                               // ${user.address.suite},
                                //${user.address.city}
                            //</span>
                        //</div>

                       // <div class="detail">
                           // <span class="label">Company</span>
                           // <span class="value">${user.company.name}</span>
                        //</div>

                    //</div>`
//)}
//loadData();
main();