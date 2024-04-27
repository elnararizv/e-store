const add_btn = document.querySelectorAll('.add')
const del_btn = document.querySelectorAll('.del')
const sum_price = document.querySelector('.price')
const totalEl = document.querySelector('.total')
let input = document.querySelector('.inp')
let prdctName = document.querySelector('.card-title')
let cartItem=document.querySelector('.cartItem')
let cart=document.querySelector('#cart')


cart.addEventListener('click',function(){
    document.querySelector('.shop').style.display="none"
    document.querySelector('.cartItem').style.display="flex"
})

function backHome(){
    document.querySelector('.shop').style.display="block"
    document.querySelector('.cartItem').style.display="none"
}
let obj = {};
let sum = 0;

add_btn.forEach((b) => {
    b.addEventListener('click', () => {
      sum++;
        sum_price.innerText = sum;
        const card_body = b.closest('.card-body');
        const name = card_body.querySelector('.card-title').textContent;
        if (!obj[name]) {
            obj[name] = {
                quantity: 1,
                price: parseInt(card_body.querySelector('.card-text').textContent)
            };

        } else {
            obj[name].quantity++;
        
        }
        prdctPrice(obj[name].quantity, obj[name].price);
        totalPrice();
        addCart(name)
})}
    );

    del_btn.forEach((b) => {
        b.addEventListener('click', () => {
            const card_body = b.closest('.card-body');
            const name = card_body.querySelector('.card-title').textContent;
            if (obj[name]) {
                sum--;
                sum = sum < 0 ? 0 : sum; 
                sum_price.innerText = sum;
                if(obj[name]){
                    if(obj[name].quantity ===0){
                        delete obj[name]
                    }else{
                        obj[name].quantity--
                    }
                }
               
                totalPrice();
                console.log(obj)
               
            }
            removeCart(name)
          
        });
    });

    function prdctPrice(a, b) {
        console.log(a * b)
    }

    function totalPrice() {
        let total = 0;
        for (let key in obj) {
            total += obj[key].quantity * obj[key].price;
        }
        totalEl.innerText = total
    }

    totalPrice();

    input.addEventListener('keyup', function () {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            const productName = card.querySelector('.card-title').textContent.toLowerCase();
            if (productName.includes(input.value.toLowerCase())) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    })

    function addCart(name) {
        const cartProducts = document.querySelectorAll('.name');
        console.log(cartProducts)
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].textContent === name) {
                const quantityElement = cartProducts[i].nextElementSibling.nextElementSibling;
                const quantity = obj[name].quantity;
                quantityElement.textContent = "Count: " + quantity;
                return; 
            }
        }
        cartItem.innerHTML += `
        <div class="border border-dark rounded text-center mx-2 p-2 fw-bold" style="width: 20%;background-color: rgba(35, 35, 216, 0.5);">
        <h4 class="name">${name}</h4>
        <p>Price: ${obj[name].price}$</p>
        <p>Count: ${obj[name].quantity}</p>
    </div>`;
    }
    
    function removeCart(name) {
        const cartProducts = document.querySelectorAll('.name');
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].textContent === name) {
                const quantityElement = cartProducts[i].nextElementSibling.nextElementSibling;
                const quantity = obj[name].quantity;
                quantityElement.textContent = "Count: " + quantity;
                if (quantity == 0) {
                    cartProducts[i].parentElement.remove();
                }
           
            }
        }
    }
 
    
let buttons = document.querySelectorAll('.btn-outline-dark');
let cards = document.querySelectorAll('.card');
document.addEventListener("DOMContentLoaded", function() {
    buttons[0].click();
});
    
buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        buttons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        let start = (parseInt(btn.textContent) - 1) * 3;
        cards.forEach(function(card, ind) {
            if (ind >= start && ind < start + 3) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});






