/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: Nguyen Trong Tien
  ID: s3978616 */

const token = localStorage.getItem("token");
function renderProduct() {
  var products = JSON.parse(localStorage.getItem("cart")).products;
  const productContainer = document.querySelector("#cart_product");
  console.log(products);
  products.forEach(async (product) => {
    const productByID = await fetch(
      `http://localhost:3000/api/v1/product/${product.productID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const product_data = (await productByID.json()).product;
    console.log(product_data);
    productContainer.innerHTML += `                    
        <tr> 
            <td>
                <div class="cart-info">
                    <img src="${product_data.imageURL}">
                    <div>
                    <p>${product_data.name}</p>
                    <button class="remove-btn">
                        Remove
                    </button>
                </div>
            </td>
            <td>$${product_data.price}</td>
            <td id="quantity"><input type="number" value="${
              product.quantity
            }"></td>
            <td>$${product_data.price * product.quantity}</td>
        </tr>
        
    `;
  });
}

function Order() {
  document
    .getElementById("purchase-btn-wrapper")
    .addEventListener("click", async function () {
      const cart = localStorage.getItem("cart");
      const res = await fetch(`http://localhost:3000/api/v1/customer/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: cart,
      });
      const data = await res.json();
      console.log(data);
      const productContainer = document.querySelector("#cart_product");
      productContainer.innerHTML = `
            <tr>
                <th>Product</th>
                <th id="price">Price</th>
                <th id="quantity_title">Quantity</th>
                <th>Subtotal</th>
            </tr>
        `;
    });
}
Order();
renderProduct();
