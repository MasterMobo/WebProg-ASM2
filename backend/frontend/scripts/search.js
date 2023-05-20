const searchInput = document.querySelector('.search_bar');
const searchButton = document.querySelector('.bx-search');
const products = document.querySelectorAll('.product');
searchButton.addEventListener('click', () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  products.forEach(product => {
    const productName = product.querySelector('.product-name').textContent.trim().toLowerCase();
    if (productName.includes(searchValue)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});