var ctBtn = document.querySelector('.product-des-btn-ct')
var bqBtn = document.querySelector('.product-des-btn-bq')
var mainWrite = document.querySelector('.product-des-bottom-body')
var menuLink = document.querySelectorAll('.menu-item-link')
var plus = document.querySelector('.inputbtn-plus')
var dec = document.querySelector('.inputbtn-dec')
var valueinput = document.querySelector('.inputtext')
var buyBtn = document.getElementById('buy')
var bagBtn = document.getElementById('bag')
var moreBtn = document.getElementById('more')

var product_name
var product_price
var product_image

var btnSize = document.querySelectorAll('.size-btn');
var size = 1
var sendProduct = []
$(document).ready(function () {
    var start = new category()
})
class category {
    constructor() {
        this.loadMenu()
        this.loadData()
        this.initButton()
    }
    initButton() {
        ctBtn.onclick = function () {
            mainWrite.innerHTML = '<p>Chuc ban mot ngay tot lanh!</p>'
        }
        bqBtn.onclick = function () {
            mainWrite.innerHTML = '<p>Chuc ban mot ngay tot lanh!</p>'
        }

        plus.onclick = function () {
            var number
            number = parseInt(valueinput.value) + 1
            valueinput.value = number.toString()
        }

        dec.onclick = function () {
            var number
            number = parseInt(valueinput.value) - 1
            valueinput.value = number.toString()
        }
        btnSize.forEach((item, index) => {
            item.onclick = function () {
                size = index + 1
                btnSize.forEach((allitem) => {
                    allitem.style.background = "white"
                })
                item.style.background = "rgb(153, 148, 221)"
            }
        })
        buyBtn.onclick = function () {
            var numberProduct = parseInt(valueinput.value)
            var sizeProduct = size
            var objectProduct = {
                productName: product_name,
                productPrice: product_price,
                productImage: product_image,
                productSize: sizeProduct,
                productNumber: numberProduct
            }
            if (!sendProduct.length) {
                sendProduct = JSON.parse(localStorage.getItem("sendProducts"))
                sendProduct.push(objectProduct)
            }
            else {
                sendProduct.push(objectProduct)
            }
        }
        bagBtn.onclick = function () {
            localStorage.setItem("sendProducts", JSON.stringify(sendProduct))
            window.location.href = "shopping.html"
        }
        moreBtn.onclick = function () {
            localStorage.setItem("sendProducts", JSON.stringify(sendProduct))
            window.history.back()
        }
    }

    loadMenu() {
        var _this = this
        $.ajax({
            url: "https://localhost:44348/api/homecf",
            method: "GET",
            data: "",
            dataType: "",
            contentType: "application/json"
        }).done(function (res) {
            menuLink.forEach((item, index) => {
                item.innerHTML = `${res[index].category_name}`
                item.onclick = function () {
                    localStorage.setItem("itemMenuIndex", res[index].category_id)
                    window.location.href = 'category.html'
                }
            })

        }).fail(function () {

        })
    }
    loadData() {
        var responseIndex = localStorage.getItem("resPage")
        var _this = this
        $.ajax({
            url: "https://localhost:44348/api/products/" + responseIndex,
            method: "GET",
            data: "",
            contentType: "application/json",
            dataType: ""
        }).done(function (response) {
            var mainProduct = document.querySelector('.product-top-right-top')
            var imageProduct = document.querySelector('.product-top-left')
            var x = `<div class="product-name">
                        <h1>${response.product_name}</h1>
                    </div>
                    <div class="product-price">
                        <h2>${response.product_price}<sup>d</sup></h2>
                    </div>`
            mainProduct.innerHTML = x;
            imageProduct.innerHTML = `<img src="${"data:image/jpg;base64," + response.product_image}" />`
            product_name = response.product_name
            product_price = response.product_price
            product_image = response.product_image
            _this.loadBottom(response.category_id)
        }).fail(function (response) {

        })
    }
    loadBottom(categoryId) {
        var _this = this
        $.ajax({
            url: "https://localhost:44348/getallvalue/" + categoryId,
            method: "GET",
            data: "",
            dataType: "",
            contentType: "application/json"
        }).done(function (res) {
            var allItemBottom = document.querySelector('.product-bottom-body')
            var oneItemBottom = res.map(function (item, index) {
                return `<div class="category-product">
                            <img src="${"data:image/jpg;base64," + item.product_image}" />
                            <h1>${item.product_name}</h1>
                            <p>${item.product_price}<sup>d</sup></p>
                        </div>`
            })
            allItemBottom.innerHTML = oneItemBottom.join(" ");
            var y = document.querySelectorAll('.category-product')
            y.forEach(function (item, index) {
                item.onclick = function () {
                    var mainProduct = document.querySelector('.product-top-right-top')
                    var imageProduct = document.querySelector('.product-top-left')
                    var x = `<div class="product-name">
                        <h1>${res[index].product_name}</h1>
                    </div>
                    <div class="product-price">
                        <h2>${res[index].product_price}<sup>d</sup></h2>
                    </div>`
                    mainProduct.innerHTML = x;
                    imageProduct.innerHTML = `<img src="${"data:image/jpg;base64," + res[index].product_image}" />`
                    product_name = res[index].product_name
                    product_price = res[index].product_price
                    product_image = res[index].product_image
                    _this.loadBottom(res[index].category_id)
                }
            })
        }).fail(function (res) {

        })
    }
}
