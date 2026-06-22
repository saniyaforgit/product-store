function showScreen(screen) {
  const screens = ["login", "profile", "products", "detail"]

  screens.forEach(s => {
    document.getElementById(s + "Screen").classList.add("hidden")
  })

  document.getElementById(screen + "Screen").classList.remove("hidden")
}

const loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", async () => {
  try {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    localStorage.setItem("token", data.accessToken)
    localStorage.setItem("user", JSON.stringify(data))

    renderProfile(data)
    showScreen("profile")

  } catch {
    alert("Ошибка входа")
  }
})

function renderProfile(user) {
  document.getElementById("profileInfo").innerHTML = `
    <p>${user.firstName} ${user.lastName}</p>
    <p>${user.email}</p>
  `
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token")
  showScreen("login")
})

document.getElementById("goToProductsBtn").addEventListener("click", () => {
  showScreen("products")
  loadProducts()
})

async function loadProducts(){
    try{
        productsBlock.innerHTML = "Загрузка..."

        const response = await fetch("https://dummyjson.com/products?limit=10")
        const data = await response.json()

        renderProducts(data.products)

    }catch(error){
        productsBlock.innerHTML = "Ошибка загрузки"
    }
}

async function searchProducts(){
    const query = searchInput.value.trim()

    if(query === ""){
        productsBlock.innerHTML = "Введите название"
        return
    }

    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
    const data = await res.json()

    renderProducts(data.products)
}

function renderProducts(products){
    productsBlock.innerHTML = ""

    products.forEach(p => {
        productsBlock.innerHTML += `
        <div>
            <h3>${p.title}</h3>
            <img src="${p.thumbnail}" width="120">
            <p>${p.price}</p>

            <button onclick="getProductDetail(${p.id})">
                Подробнее
            </button>
        </div>
        `
    })
}


async function getProductDetail(id){
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const p = await res.json()

    document.getElementById("productDetail").innerHTML = `
        <img src="${p.thumbnail}" width="200">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <p>Категория: ${p.category}</p>
        <p>Цена: ${p.price}</p>
        <p>Скидка: ${p.discountPercentage}%</p>
        <p>Рейтинг: ${p.rating}</p>
    `

    showScreen("detail")
}

document.getElementById("backToProductsBtn").addEventListener("click", () => {
    showScreen("products")
})

document.getElementById("backToProfileBtn").addEventListener("click", () => {
    showScreen("profile")
})

window.addEventListener("load", () => {
    const token = localStorage.getItem("token")

    if(token){
        showScreen("profile")
    }else{
        showScreen("login")
    }
})