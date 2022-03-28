var cost = document.querySelectorAll('.delivery-table-cost')
var bill = document.querySelector('.delivery-bill-price h1')
var allcost = document.querySelector('.delivery-bill-all h1')
var sum = 0
cost.forEach(function(item, index){
    sum = sum + parseInt(item.innerText.slice(0, item.innerText.length - 1))
})
bill.innerHTML = `${sum}<sup>d</sup>`
allcost.innerHTML = `${sum + 30000}<sup>d</sup>`