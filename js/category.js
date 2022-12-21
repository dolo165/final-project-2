let basket = (localStorage.getItem('basket'))? JSON.parse(localStorage.getItem('basket')) : [];

/* Получение Get параметров с url */
let params = window.location.search.replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        ); 

let id_category = (params.id)? params.id: 1; // Если нету get параметра id - ставим по умолчанию id = 1

async function getCategory() {
    let responce = await fetch(`https://63731b72348e947299033009.mockapi.io/api/v1/category/1/${id_category}/products`);
    let json = await responce.json();

    json.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('tour');
        div.classList.add('flex');
        div.dataset.id = element.id;
        div.innerHTML = `
                <div class="tour-image"><img src="${element.image}" alt=""></div>
                <div class="tour-info pl-4 pt-4 flex flex-col">
                    <div class="tour-title">${element.name}</div>
                    <div class="tour-bottom text-center">
                        <div class="tour-price"><span>${element.price}</span>$</div>
                        <button class="addCard">Добавить в корзину</button>
                    </div>
                </div>
        `;

        document.querySelector('.tours').append(div);
    });

    events_category(); // Функцию нужно запускать только после прорисовки элементов
}

getCategory();

/* Сохранение товаров в корзину */

function events_category() {
    let buttons = document.querySelectorAll('.addCard');
    buttons.forEach(element => {
        element.addEventListener('click', function() {
            let parent = this.closest('.tour');

            if (!basket[parent.dataset.id]) {
                basket[parent.dataset.id] = {
                    id: parent.dataset.id,
                    title: parent.querySelector('.tour-title').innerText,
                    price: parent.querySelector('.tour-price span').innerText,
                    image: parent.querySelector('.tour-image img').getAttribute('src'),
                    count: 1
                };
            } else {
                basket[parent.dataset.id].count++;
            }

            let json_basket = JSON.stringify(basket);

            /* Показываем уведомление и ставим таймер через сколько его нужно удалить */
            let modal = document.createElement('div');
            modal.innerText = 'Товар успешно добавлен в корзину.';
            document.querySelector('.product-add-card').append(modal);
            setTimeout(deleteModal, 1000, modal);

            function deleteModal(modal) {
                modal.parentNode.removeChild(modal);
            }

            localStorage.setItem('basket', json_basket);
        });
    });
}