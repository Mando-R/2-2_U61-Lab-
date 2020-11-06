// Constructor function for Drinks
function Drink(name, ice, sugar) {
  this.name = name
  this.ice = ice
  this.sugar = sugar
}

Drink.prototype.price = function () {
  switch (this.name) {
    case "Black Tea":
    case "Oolong Tea":
    case "Baozong Tea":
    case "Green Tea":
      return 30

    case "Bubble Milk Tea":
    case "Lemon Green Tea":
      return 50

    case "Black Tea Latte":
    case "Matcha Latte":
      return 55

    default:
      alert("No this drink")
  }
}

// Constructor function for Alpha Pos System
// 先建立Constructor，內無屬性，新增function放入其"prototype"。
const alphaPos = new AlphaPos()

function AlphaPos() { }

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = " "

  document.querySelectorAll(`[name = ${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// [Add]功能：orderLists、orderListsCard、insertAdjacentHTML
const orderLists = document.querySelector('[data-order-lists]')

AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <!-- Delete Button -->
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm rounded" data-alpha-pos="delete-drink">X</button>
        </div>

        <h5 class="card-title mb-1">${drink.name}</h5>

        <div class="card-text">${drink.ice}</div>
        <div class="card-text">${drink.sugar}</div>
      </div>

      <div class="card-footer text-right py-2">
        <div class="card-text text-primary font-weight-bold">
          $ <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
  `
  orderLists.insertAdjacentHTML("afterbegin", orderListsCard)
}

// [Delete]功能：直接綁定左邊整個訂單區
orderLists.addEventListener("click", function (event) {

  let isDeleteButton = event.target.matches('[data-alpha-pos = "delete-drink"]')

  // 若點擊到 [data-alpha-pos = "delete-drink"]
  if (isDeleteButton) {
    let fullOrderCard = event.target.parentElement.parentElement.parentElement
    // 對應 AlphaPos.prototype.deleteDrink
    alphaPos.deleteDrink(fullOrderCard)
  }

  if (!isDeleteButton) {
    return
  }
})

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

// [Total Amount]功能
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0

  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    // console.log(drink.textContent)
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

// [Clear]功能：參數 target 代入 orderLists(左側整個訂單區) 。
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll(".card").forEach(function (card) {
    card.remove()
  })
}

// [Total Amount] & [Clear]功能
const checkoutButton = document.querySelector('[data-alpha-pos = "checkout"]')
checkoutButton.addEventListener("click", function () {
  // [Total Amount]
  alert(`Total amount of drinks: $ ${alphaPos.checkout()}`)

  // [Clear]：orderLists 為左側整個訂單區。
  alphaPos.clearOrder(orderLists)
})

// Add button
const addDrinkButton = document.querySelector('[data-alpha-pos = "add-drink"]')

addDrinkButton.addEventListener("click", function (event) {
  // 1. 取得店員選擇的飲料品項、甜度和冰塊：對應Constructor function for Alpha Pos System
  const drinkName = alphaPos.getCheckedValue("drink")
  const ice = alphaPos.getCheckedValue("ice")
  const sugar = alphaPos.getCheckedValue("sugar")
  //console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert("Please choose at least one item.")
    return
  }

  // 3. 建立飲料實例，並取得飲料價格：對應 Constructor function for Drinks
  const drink = new Drink(drinkName, ice, sugar)
  //console.log(drink)
  console.log(`${drink.name},${drink.ice}, ${drink.sugar},${drink.price()}`)

  // 4. 將飲料實例產生成左側訂單區的畫面：對應 [Add]功能：orderLists、orderListsCard、insertAdjacentHTML
  alphaPos.addDrink(drink)
})








