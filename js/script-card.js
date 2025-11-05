document.addEventListener('DOMContentLoaded', function() {
  const cartContainer = document.querySelector('.cart-items');
  const subtotalEl = document.querySelector('.order-summary p:nth-of-type(1) span');
  const entregaEl = document.querySelector('.order-summary p:nth-of-type(2) span');
  const totalEl = document.querySelector('.order-summary p.total span');
  const checkoutBtn = document.querySelector('.checkout-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const entregaValor = 3.99;

  function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      subtotalEl.innerText = 'R$ 0,00';
      entregaEl.innerText = 'R$ 0,00';
      totalEl.innerText = 'R$ 0,00';
      return;
    }

    let subtotal = 0;
    let totalItens = 0;

    cart.forEach((item, index) => {
      const totalItemPrice = item.price * item.quantity;
      subtotal += totalItemPrice;
      totalItens += item.quantity;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      cartItem.innerHTML = `
        <div class="item-details">
          <h2>${item.name}</h2>
          <p class="restaurant-name">${item.restaurant}</p>
          <div class="quantity-control">
            <button class="decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>
        <div class="item-price">
          <strong>R$ ${totalItemPrice.toFixed(2).replace('.', ',')}</strong>
          <span>R$ ${item.price.toFixed(2).replace('.', ',')} cada</span>
        </div>
        <button class="remove-item" data-index="${index}"><i data-lucide="trash-2"></i></button>
      `;

      cartContainer.appendChild(cartItem);
    });

    subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')} (${totalItens} itens)`;
    entregaEl.innerText = `R$ ${entregaValor.toFixed(2).replace('.', ',')}`;
    const totalFinal = subtotal + entregaValor;
    totalEl.innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;

    addCartEventListeners();
  }

  function addCartEventListeners() {
    cartContainer.querySelectorAll('.increase').forEach(button => {
      button.addEventListener('click', function() {
        const index = button.getAttribute('data-index');
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    cartContainer.querySelectorAll('.decrease').forEach(button => {
      button.addEventListener('click', function() {
        const index = button.getAttribute('data-index');
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    cartContainer.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = button.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    
    fetch('../php/verificar_login.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          
          alert(`Pedido finalizado com sucesso para ${data.cliente.nome}!`);
          localStorage.removeItem('cart');
          cart = [];
          renderCart();
        } else {
          alert('Você precisa estar logado para finalizar o pedido.');
        }
      })
      .catch(() => {
        alert('Erro ao verificar o login. Tente novamente.');
      });
  });

  renderCart();
});

