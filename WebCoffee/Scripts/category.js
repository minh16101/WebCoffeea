var itemMenuIndex = -1
var menuLink = document.querySelectorAll('.menu-item-link');
$(document).ready(function () {
    var start = new category()
})

class category {
    constructor() {
        this.loadMenu()
        this.loadData()
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
        if (itemMenuIndex = -1) {
            itemMenuIndex = localStorage.getItem("itemMenuIndex")
            localStorage.setItem("itemMenuIndex", -1)
        }
        
        $.ajax({
            url: "https://localhost:44348/api/category/" + itemMenuIndex,
            method: "GET",
            data: "",
            contentType: "application/json",
            dataType: ""
        }).done(function (res) {
            var allProduct = document.querySelector('.category-right-bottom a');
            var arrayProduct = res.map(function (item, index) {
                return `<div class="category-product">
                            <img src="${"data:image/jpg;base64," + item.product_image}" />
                            <h1>${item.product_name}</h1>
                            <p>${item.product_price}<sup>d</sup></p>
                        </div>`;
            })
            if (allProduct != null)
                allProduct.innerHTML = arrayProduct.join(" ");//phai them vao file html truoc thi moi lay ra duoc con de dong nay o sau thi khong lay duoc do chua co trong file html
            var y = document.querySelectorAll('.category-product')
            y.forEach(function (item, index) {
                item.onclick = function () {
                    var responseIndex = res[index].product_id
                    localStorage.setItem("resPage", responseIndex)
                    window.location.href = "product.html"
                }
            })
        }).fail(function (res) {
        })
    }
    
}