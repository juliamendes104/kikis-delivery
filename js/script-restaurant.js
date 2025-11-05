document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const dishItem = button.closest('li');
      const restaurantCard = button.closest('.restaurant-card');

      const dishName = dishItem.querySelector('.dish-name').innerText;
      const dishPriceText = dishItem.querySelector('.price').innerText.replace('R$', '').replace(',', '.').trim();
      const dishPrice = parseFloat(dishPriceText);
      const restaurantName = restaurantCard.querySelector('h2').innerText;

      // Buscar o carrinho atual (se já tiver itens)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Verificar se o mesmo prato, do mesmo restaurante, já está no carrinho
      const existingItem = cart.find(item => item.name === dishName && item.restaurant === restaurantName);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: dishName,
          restaurant: restaurantName,
          price: dishPrice,
          quantity: 1
        });
      }

      // Salvar de volta no localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`"${dishName}" adicionado ao carrinho!`);
    });
  });
});
