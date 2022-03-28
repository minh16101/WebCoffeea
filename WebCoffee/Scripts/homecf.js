var imgPosition = document.querySelectorAll('.slide-container img')
var btnSlidePosition = document.querySelectorAll('.dot-button .dot')
var imgContainer = document.querySelector('.slide-container')
var btnNextPage = document.querySelectorAll('.menu-item-link')

var index = 0

imgPosition.forEach(function(image, index){
    image.style.left = index * 100 +'%'
})
const object = {
    imgNextSlide: function(){
        btnSlidePosition.forEach(function(item){
            item.style.backgroundColor = 'white'
        })
        if(index == imgPosition.length - 1)
        {
            index = -1
        }
        index++
        imgContainer.style.left = '-'+ index * 100 +'%'      
        btnSlidePosition[index].style.backgroundColor = 'black'  
    },
    btnSlide: function(){
        btnSlidePosition.forEach(function(dot, i){
            dot.onclick = function(){
                index = i
                imgContainer.style.left = '-'+ index * 100 +'%'
                btnSlidePosition.forEach(function(item){
                    item.style.backgroundColor = 'white'
                })
                dot.style.backgroundColor = 'black'
                
            }
        })
    },
    loadData: function () {
        $.ajax({
            url: "https://localhost:44348/api/homecf",
            method:"GET",
            data: "",
            dataType: "",
            contentType: "application/json"
        }).done(function (res) {
            btnNextPage.forEach((item, index) => {
                item.innerHTML = `${res[index].category_name}`
                item.onclick = function () {
                    localStorage.setItem("itemMenuIndex", res[index].category_id)
                    window.location.href = "category.html"
                }
            })

        }).fail(function () {

        })
    },
    start: function () {
        this.loadData()
        if (imgContainer != null) {
            setInterval(this.imgNextSlide, 3000)
            this.btnSlide()
        }
        var ob = []
        localStorage.setItem("sendProducts", JSON.stringify(ob))
        
    }
}
object.start()