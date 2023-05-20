// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

const start = async () => {
    const res = await fetch("http://localhost:3000/api/v1/product", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();

    renderProducts(data.products);

    console.log(data);
};
start();

const renderProducts = (products) => {
    const productContainer = document.querySelector(".product-two");
    productContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <a href="../pages/productPage.html?id=${product._id}">    
            <div class="product-image">
                                <img
                                    src="${product.imageURL}"
                                    alt="${product.name}"
                                />
                            </div>
                            <div class="product-name">
                                <h2>${product.name}</h2>
                            </div>
                            <div class="product-price">
                                <span>${product.price}</span><span>$</span>
                            </div>
        </a>
        `;
        productContainer.appendChild(productCard);
    });
};
