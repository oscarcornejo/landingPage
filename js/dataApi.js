let texto = document.getElementById('testimonio');

// MÉTODO PARA OBTENER POSTS
async function getPosts(id) {

    return await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((resp) => {
            return resp.json();
        })
        .then((post) => {
            for (let i = 0; i < 4; i++) {
                return post;
            }
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
}

// MÉTODO PARA OBTENER USUARIOS
async function getUsers() {
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then((resp) => {
            return resp.json();
        })
        .then((user) => {

            for (let i = 0; i < 4; i++) {
                const usuario = user[i];
                getPosts(usuario.id).then(resp => {
                    usuario.posts = resp;
                    user[i] = usuario;
                    let string = '';

                    if (user[i].id === 1) {
                        string += `
                            <div class="carousel-item active">
                                <img class="d-block mx-auto" src="images/person_${i + 1}.jpg" alt=""> 
                        `;
                    } else {
                        string += `
                            <div class="carousel-item">
                                <img class="d-block mx-auto" src="images/person_${i + 1}.jpg" alt=""> 
                        `;
                    }

                    string += ` <p class="text-center sliderText">${usuario.posts[0].body}</p>`;
                    string += `<p class="text-center"><b>${usuario.name}</b></p>`;
                    string += `</div>`;

                    texto.innerHTML += string;

                    ;
                });
            }
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
}

getUsers();