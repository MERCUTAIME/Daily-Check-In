/* JS Library usage examples */
"use strict";
console.log('----------')
console.log('SCRIPT: Examples of using our libraries')
console.log('In general, we should have the code that uses our libraries separate from the actual library code.')

// dailycheckin
var checkin = new Checkin()

function examples(){
    checkin.init()
    checkin.events()

    //https://www.w3schools.com/howto/howto_js_dropdown.asp
    var changeBackgroundBtn = $(".changeBackground")
    changeBackgroundBtn.click(function() {
        $(".dropdown0")[0].classList.toggle("show")
        var pink = $(".pink0")
        pink.click(function(){
            checkin.changeBackground('#fff4fa')
            $(".changeColor").off()
        })
        var purple = $(".purple0")
        purple.click(function(){
            checkin.changeBackground('#d7d3ff')
        })
        var green = $(".green0")
        green.click(function(){
            checkin.changeBackground('#486b4c')
        })
    })

    var changeCheckedColorBtn = $(".changeCheckedColor")
    changeCheckedColorBtn.click(function() {
        $(".dropdown1")[0].classList.toggle("show")
        var pink = $(".pink1")
        pink.click(function(){
            checkin.changeCheckedColor('#fff4fa')
        })
        var purple = $(".purple1")
        purple.click(function(){
            checkin.changeCheckedColor('#d7d3ff')
        })
        var green = $(".green1")
        green.click(function(){
            checkin.changeCheckedColor('#486b4c')
        })
    })

    var changeTodayColorBtn = $(".changeTodayColor")
    changeTodayColorBtn.click(function() {
        $(".dropdown2")[0].classList.toggle("show")
        var pink = $(".pink2")
        pink.click(function(){
            checkin.changeTodayColor('#fff4fa')
        })
        var purple = $(".purple2")
        purple.click(function(){
            checkin.changeTodayColor('#d7d3ff')
        })
        var green = $(".green2")
        green.click(function(){
            checkin.changeTodayColor('#486b4c')
        })
    })

    var changeBtnColorBtn = $(".changeBtnColor")
    changeBtnColorBtn.click(function() {
        $(".dropdown3")[0].classList.toggle("show")
        var pink = $(".pink3")
        pink.click(function(){
            checkin.changeBtnColor('#fff4fa')
        })
        var purple = $(".purple3")
        purple.click(function(){
            checkin.changeBtnColor('#d7d3ff')
        })
        var green = $(".green3")
        green.click(function(){
            checkin.changeBtnColor('#486b4c')
        })
    })

    var changeCalColorBtn = $(".changeCalColor")
    changeCalColorBtn.click(function() {
        $(".dropdown4")[0].classList.toggle("show")
        var pink = $(".pink4")
        pink.click(function(){
            checkin.changeCalColor('#fff4fa')
        })
        var purple = $(".purple4")
        purple.click(function(){
            checkin.changeCalColor('#d7d3ff')
        })
        var green = $(".green4")
        green.click(function(){
            checkin.changeCalColor('#486b4c')
        })
    })

}

examples();

