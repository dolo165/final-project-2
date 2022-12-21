let basket = (localStorage.getItem('basket'))? JSON.parse(localStorage.getItem('basket')): [];

basket.forEach(element => {
  if (element) {
    let div = document.createElement('div');
    div.classList.add('tour');
    div.classList.add('flex');
    div.dataset.id = element.id;
    div.innerHTML = `
    <div class="tour-image"><img src="${element.image}" alt=""></div>
        <div class="tour-info pl-4 pt-4 flex flex-col">
            <div class="remove-icon"><img src=""></div>
            <div class="tour-title">${element.title}</div>
            <div class="tour-bottom text-center">
                <div class="tour-price"><span>${element.price}</span>$</div>
                <div class="tour-count">
                    <div class="custom-number-input h-10 w-32">
                        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                          <button data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span class="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input type="number" class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="${element.count}"></input>
                        <button data-action="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.tours').append(div);
  }
});


console.log(basket);

function decrement(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value--;
  value = (value < 0)? 0: value;
  target.value = value;
}

function increment(e) {
  const btn = e.target.parentNode.parentElement.querySelector(
    'button[data-action="decrement"]'
  );
  const target = btn.nextElementSibling;
  let value = Number(target.value);
  value++;
  target.value = value;
}

const decrementButtons = document.querySelectorAll(
  `button[data-action="decrement"]`
);

const incrementButtons = document.querySelectorAll(
  `button[data-action="increment"]`
);

decrementButtons.forEach(btn => {
  btn.addEventListener("click", decrement);
});

incrementButtons.forEach(btn => {
  btn.addEventListener("click", increment);
});

let delete_card = document.querySelectorAll('.remove-icon img');

function calc_sum() {
  let sum = 0;
  let length = 0;
  basket.forEach(element => {
    if (element) {
      sum += element.price * element.count;
      length++;
    }
  })
  
  document.querySelector('.h1 span').innerHTML = '(' + length + ')';
  document.querySelector('.price').innerHTML = sum;
}

delete_card.forEach(element => {
  element.addEventListener('click', function () {
    let parent = this.closest('.tour');
    console.log(parent.dataset.id);
    basket[parent.dataset.id] = null;
    localStorage.setItem('basket', JSON.stringify(basket));
    parent.parentNode.removeChild(parent);
    calc_sum();
  });
})
