import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then((res) => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            text: "Item added to cart",
            type: 'success',
            closeWith: ['click', 'button'],
            timeout: 1000
        }).show();
    }).catch((error) => {
        new Noty({
            text: "Something went wrong",
            type: 'error',
            closeWith: ['click', 'button'],
            timeout: 1000
        }).show();
    });
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let pizza = JSON.parse(btn.getAttribute('data-pizza'));
        updateCart(pizza);
    });
});

