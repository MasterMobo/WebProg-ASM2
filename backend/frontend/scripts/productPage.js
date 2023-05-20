// get id from URL params
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

const start = async () => {
    const productByID = await fetch(
        `http://localhost:3000/api/v1/product/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await productByID.json();
    renderProduct(data.product);
    addToCart(data.product);
    console.log(data);
    const recommenedProducts = await fetch(
        `http://localhost:3000/api/v1/product?category=${data.product.category}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const recommenedProductsData = await recommenedProducts.json();
    renderRecommenedProducts(recommenedProductsData.products);
    console.log(recommenedProductsData);
};

start();

const renderProduct = (product) => {
    productContainer = document.querySelector(".item-information");
    productContainer.innerHTML = "";
    productContainer.innerHTML = `                    
    <div class="item-image-and-description">
    <div class="item-image-container">
        <img
            class="item-image"
            src="${product.imageURL}"
            alt="${product.name}"
        />
    </div>
    <div class="shop-detail">
        <span>${product.name}</span>
        <div
            class="payment-number-of-sold-and-content-wrapper"
        >
            <div class="payment-number-of-sold-and-content">
                <div class="payment-and-add-to-cart">
                    <div class="payment">
                        <div
                            class="payment-box-and-quantity-demand"
                        >
                            <div
                                class="payment-quantity-demand"
                            ></div>
                            <div class="payment-box">
                                <h1>${product.price}</h1>
                            </div>
                        </div>
                        <div class="add-to-cart" id="add-to-cart">
                            <a
                                class="add-to-cart-link"
                            >
                                <span
                                    class="add-to-cart-in-word"
                                    >Add to Cart</span
                                >
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="description-and-share">
    <div class="product-description">
        <div class="description-title">
            <span>Description</span>
        </div>
        <div class="description">
            <p>${product.description}</p>
        </div>
    </div>
    <div class="share-shop-wrapper">
        <div class="share-shop">
            <span>Share</span>
        </div>
        <div class="share-shop-links">
            <a href="" class="media">
                <img
                    class="media-logo"
                    src="../serviceImages/facebooklogo.png"
                    alt="facebooklogo"
                    width="45"
                    height="40"
                />
            </a>
            <a href="" class="media">
                <img
                    class="media-logo"
                    src="../serviceImages/twitterlogo.png"
                    alt="twitterlogo"
                    width="40"
                    height="40"
                />
            </a>
            <a href="" class="media">
                <img
                    class="media-logo"
                    src="../serviceImages/instagramlogo.jpg"
                    alt="instagramlogo"
                    width="40"
                    height="40"
                />
            </a>
        </div>
    </div>
</div>`;
};

const renderRecommenedProducts = (recommendedProducts) => {
    const productContainer = document.querySelector(".product-two");
    productContainer.innerHTML = "";
    recommendedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <a href="../ProductPage/index.html?id=${product._id}">    
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

function addToCart(product) {
    var addToCartButton = document.getElementById('add-to-cart');
    addToCartButton.addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify({
            "products"  : [
                {
                    "productID": product._id, 
                    quantity: 1
                },
            ],
            
        }));
        console.log('added to cart');
        
    });
};

