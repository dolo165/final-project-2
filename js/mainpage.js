async function getCategory() {
    let responce = await fetch('https://638753ede399d2e473fbc7fa.mockapi.io/avi/v1/categories');
    let json = await responce.json();

    json.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('col-6');
        div.dataset.id = element.id;
        div.innerHTML = `
        <a href="category.html?id=${element.id}">
            <div class="item">
                <img src="${element.image}" alt="">
                <span>${element.name}</span>
            </div>
        </a>
        `;

        document.querySelector('.grid').append(div);
    });
}

getCategory();
