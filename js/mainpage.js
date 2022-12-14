// async function getCategory() {
//     let responce = await fetch('https://63731b72348e947299033009.mockapi.io/api/v1/category');
//     let json = await responce.json();

//     json.forEach(element => {
//         let div = document.createElement('div');
//         div.classList.add('col-6');
//         div.dataset.id = element.id;
//         div.innerHTML = `
//         <a href="category.html?id=${element.id}">
//             <div class="item">
//                 <img src="${element.image}" alt="">
//                 <span>${element.name}</span>
//             </div>
//         </a>
//         `;

//         document.querySelector('.category').append(div);
//     });
// }

// getCategory();

