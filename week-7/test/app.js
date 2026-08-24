const alertEL = document.querySelector(".alert");

const setAlert = (text = "", type = "info") => {
    alertEL.textContent = type;
}

const main = async () => {
    const mainEL = document.querySelector('.root');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        const totalposts = posts.length;
        let card = ``;

        for (let i = 0; i <totalposts; i++ ){

            const post = posts[i];
            console.log(post)
            card = `
            <div class="card">
                <h2 class="card-title">${post.title} </h2>
                <p class="card-desc"> ${post.body}</p>
            </div>
            `
            mainEL.insertAdjacentHTML("beforeend",card)
        }


    } catch (error) {
        setAlert("check your work something is wrong!")
    }




}

main()