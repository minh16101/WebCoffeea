var allOfNumber = document.querySelector('.number-of-product')
var table = document.querySelector('.cart-body-left table')
var valueinput = document.querySelectorAll('.inputtext')
var plus = document.querySelectorAll('.inputbtn-plus')
var dec = document.querySelectorAll('.inputbtn-dec')
var costInBill = document.querySelectorAll('.cost-in-bill')
var sumCost = document.querySelector('.sum-cost')
var realCost = document.querySelector('.real-cost')
var payCost = document.querySelector('.pay-cost')
var buyContinue = document.getElementById('buy-continue')
var buySuccess = document.getElementById('buy-success')
var menuLink = document.querySelectorAll('.menu-item-link')


var number = 0
var costArray = []
$(document).ready(function () {
    var start = new Shopping()
})
class Shopping {
    constructor() {
        this.loadMenu()
        this.loadData()    
        this.getNumberProduct()
        this.getSumCost()
        this.initButton()
    }
    loadMenu() {
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
    initButton() {
        valueinput = document.querySelectorAll('.inputtext')
        plus = document.querySelectorAll('.inputbtn-plus')
        dec = document.querySelectorAll('.inputbtn-dec')
        var _this = this
        buyContinue.onclick = function () {
            window.history.go(-2)
        }
        buySuccess.onclick = function () {
            alert("Mua hang thanh cong")
        }
        plus.forEach(function (itemPlus, index) {
            itemPlus.onclick = function () {
                number = parseInt(valueinput[index].value) + 1
                valueinput[index].value = number.toString()
                costInBill[index].innerHTML = `<p>${number * costArray[index]}<sup>d</sup></p>`
                _this.getNumberProduct()
                let val = _this.getSumCost()
                sumCost.innerHTML = `${val}<sup>d</sup>`
                realCost.innerHTML = sumCost.innerHTML
                payCost.innerHTML = sumCost.innerHTML
            }
        })
        dec.forEach(function (itemDec, index) {
            itemDec.onclick = function () {
                number = parseInt(valueinput[index].value) - 1
                valueinput[index].value = number.toString()
                costInBill[index].innerHTML = `<p>${number * costArray[index]}<sup>d</sup></p>`
                _this.getNumberProduct()
                let val = _this.getSumCost()
                sumCost.innerHTML = `${val}<sup>d</sup>`
                realCost.innerHTML = sumCost.innerHTML
                payCost.innerHTML = sumCost.innerHTML
            }
        })
    }
    loadData() {      
        var productsBuy = JSON.parse(localStorage.getItem("sendProducts"))
        productsBuy.forEach(function (item, index) {
            var row = table.insertRow(index + 1)
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            cell1.innerHTML = `<div><img src="${"data:image/jpg;base64," + item.productImage}" /></div>`
            cell2.innerHTML = `<div><p>${item.productName}</p></div>`
            cell3.innerHTML = `<div><p>${item.productSize}</p></div>`
            cell4.innerHTML = `<div class="inputId">
                                <input type="button" value="+" class="inputbtn-plus" />
                                <input type="text" class="inputtext" min="0" value="${item.productNumber}" />
                                <input type="button" value="-" class="inputbtn-dec" />
                                </div>`
            cell5.innerHTML = `<div class="cost-in-bill">${item.productPrice}</div>`
            cell6.innerHTML = `<div><button>x</button></div>`
            costArray[index] = item.productPrice
        })
       
    }
    getNumberProduct() {
        valueinput = document.querySelectorAll('.inputtext')
        let sum = 0
        valueinput.forEach(function (item) {
            sum = sum + parseInt(item.value)
        })
        allOfNumber.innerHTML = sum.toString()
    }
    getSumCost() {
        valueinput = document.querySelectorAll('.inputtext')
        costInBill = document.querySelectorAll('.cost-in-bill')
        let sum = 0
        let val
        costInBill.forEach(function (item) {
            val = item.innerText.slice(0, item.innerText.length)
            sum = sum + parseInt(val)
        })
        sumCost.innerHTML = `${sum}<sup>d</sup>`
        realCost.innerHTML = sumCost.innerHTML
        payCost.innerHTML = sumCost.innerHTML
        return sum
    }
}
