const cart = () => {
    const buttonCart = document.querySelector('.button-cart');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close'); 
    const clearCart = modalCart.querySelector('.clear-cart');
    const modalBody = modalCart.querySelector('.modal-body');
    const buttonSend = modalCart.querySelector('.button-primary');

    const resetCart = () => {
        modalBody.innerHTML = '';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
        window.location.reload(true);
    }

    const incementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
               item.count++ 
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'))

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0
                ? item.count - 1
                : item.count = 0;
            }

            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArray))
        renderItems(cartArray)    }

    const renderItems = (data) => {
        modalBody.innerHTML = '';
        data.forEach(({ name, price, id, count}) => {
            const cartElem = document.createElement('div');
            cartElem.classList.add('food-row');

            cartElem.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                </div>
            `
            modalBody.append(cartElem);
        });
    }

    modalBody.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.classList.contains('btn-inc')) {
            incementCount(event.target.dataset.index);
        } else if (event.target.classList.contains('btn-dec')) {
            decrementCount(event.target.dataset.index);
        }
    });

    buttonSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                console.log(cartArray)
                resetCart();
            }
        })
        .catch(error => {
            console.error(error);
        })
    })

    buttonCart.addEventListener('click', () => {
        console.log();

        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }

        modalCart.classList.add('is-open');
    })

    close.addEventListener('click', () => {
        modalCart.classList.remove('is-open');
    })

    clearCart.addEventListener('click', () => {
        resetCart();
    })

}
export default cart;