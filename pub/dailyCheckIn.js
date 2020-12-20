// var showself
// var showself1
// var showself2
// var showsave
// var showclose
// var showcheck
/* JS Library */
"use strict";
(function(global, document, $) { 

    function Checkin() {

        this.defaults = {}
        this.isChecked = false
        this.obj = this.defaults
        this.calendars = []

    }

    Checkin.prototype = {

        init: function() {

            const checkin = document.createElement('div')
            $(checkin).addClass("checkin")
            const body = $('body')
            $(checkin).prependTo(body);

            const elements = $(checkin)
            //calendar appearance
            this.defaults = {
                width: 450,
                height: 450,
                background: '#d8efff',
                radius: 10,
                color: '#000000',
                padding: 10,
                dateArray: [3, 5, 10, 15],
                records: {
                    3:"Breakfast: Cereal with 1% milk, Half a grapefruit, Coffee. Lunch: Green salad: Lattuce, Tomatoes, shredded Cheddar Cheese, 1/2 cup of grilled chicken, Water.",
                    5:"Today I learned to never skip wearing glasses when reading a recipe. My enthusiasm for baking hasn’t wained a bit despite the firemen’s sudden appearance."
                }
            }
            this.isChecked = false
            this.obj = this.defaults


            var _self = elements,
                html = '',
                currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth(),
                day = currentDate.getDate(),
                week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

                var text = ''
                switch (month +1){
                    case 1:
                        text = 'January'
                        break
                    case 2:
                        text = "February"
                        break
                    case 3:
                        text = "March"
                        break
                    case 4:
                        text = "April"
                        break
                    case 5:
                        text = "May"
                        break
                    case 6:
                        text = "June"
                        break
                    case 7:
                        text = "July"
                        break
                    case 8:
                        text = "August"
                        break
                    case 9:
                        text = "September"
                        break
                    case 10:
                        text = "October"
                        break
                    case 11:
                        text = "November"
                        break
                    case 12:
                        text = "December"
                        break
                }
            
            
            _self.css({
                width: this.obj.width + 'px',
                height: this.obj.height,
                background: this.obj.background,
                borderRadius: this.obj.radius,
                color: this.obj.color,
                padding: this.obj.padding
            }).append("<div class='title'><p>" + text + "</p><a class='checkBtn' href='javascript:'>Check In</a></div>")
            $("<ul class='week'></ul><ul class='calendarList'></ul>").appendTo(_self)
            //showself1 = _self
            for (var i = 0; i < 7; i++) {
                $(".week").append("<li>" + week[i] + "</li>")
            }
            for (var i = 0; i < 42; i++) {
                html += "<li></li>"
            }
            $(".calendarList").append(html)
            var liEle = $(".calendarList").find("li")
            $(".week li").css({
                width: (_self.width() / 7) + 'px',
                height: 50 + 'px',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                boxSizing: 'border-box',
                background: '#fff'
            })
            liEle.css({
                width: (_self.width() / 7) + 'px',
                height: 50 + 'px',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                boxSizing: 'border-box',
                color: "#000000"
            })
            $(".calendarList").find("li:nth-child(7n)").css('borderRight', 'none')
            $(".week li:nth-child(7n)").css('borderRight', 'none')
            var firstIndent = new Date(year, month, 1).getDay()
            //console.log("firstIndent: "+ firstIndent)
            var lastDay = new Date(year, (month + 1), 0)
            //console.log("lastDay: "+ lastDay)
            var totalDay = lastDay.getDate() 
            //console.log("totalDay: "+ totalDay)
            for (var i = 0; i < totalDay; i++) {
                liEle.eq(i + firstIndent).html(i + 1)
                liEle.eq(i + firstIndent).addClass('day' + (i + 1))
                if (Array.isArray(this.obj.dateArray)) {
                    for (var j = 0; j < this.obj.dateArray.length; j++) {
                        if (i+1 == this.obj.dateArray[j]) {
                            // console.log("i: "+i)
                            // console.log("i+ firstIndent: "+(i+ firstIndent))
                            liEle.eq(i + firstIndent).addClass('checked')
                            liEle.eq(i + firstIndent).prop('title', this.obj.records[i+1]);                    
                        }
                    }
                }
            }
        
            $($(".day" + day)).addClass('able-checkin')
            this.calendars.push(checkin)
            
            
        },
        changeBackground: function(color){
            for (var i=0; i<$(".checkin").length; i++ )
                $(".checkin")[i].style.backgroundColor = color
        },
        changeCheckedColor: function(color){
            for (var i=0; i<$("li.checked").length; i++ )
                $("li.checked")[i].style.backgroundColor = color
        },
        changeTodayColor: function(color){
            for (var i=0; i<$("li.able-checkin").length; i++ )
                $("li.able-checkin")[i].style.backgroundColor = color
        },
        changeBtnColor: function(color){
            for (var i=0; i<$(".title a").length; i++ )
                $(".title a")[i].style.backgroundColor = color
        },
        changeCalColor: function(color){
            var cachedThis = this
            var oldChecked = $("li.checked")[0].style.backgroundColor
            var oldToday = $("li.able-checkin")[0].style.backgroundColor
            for (var i=0; i<$(".checkin li").length; i++ ){
                $(".checkin li")[i].style.backgroundColor = color
            }
            cachedThis.changeCheckedColor(oldChecked)
            cachedThis.changeTodayColor(oldToday)

        },
        modal: function() {
            var defaults = this.defaults
            // console.log("defaults: "+ defaults)
            var mask = $(".mask")
            var close = $(".closeBtn")
            if (mask && !this.isChecked) {
                mask.addClass('trf')
                this.isChecked = true
            } else {
                return
            }
            close.click(function(event) {
                event.preventDefault()
                mask.removeClass('trf')
            })
            $('.checkBtn').text("Checked In")

            const divform = document.createElement('div')
            const textbox = document.createElement('form')
            const saveBtn = document.createElement('button')
            $(divform).addClass("form")
            $(textbox).append("<label class='textboxTitle'>record your mood today</label> <textarea class='box'></textarea>")
            $(divform).append(textbox)
            $(saveBtn).addClass("saveBtn")
            saveBtn.onclick = function(){
                console.log("clicked save")
                mask.removeClass('trf')
                var day = new Date().getDate()
                if ($(".box").val() != ""){
                    defaults.records[day] = $(".box").val()
                    $(".day"+day).prop('title', $(".box").val());     
                }
                console.log(defaults.records)
            }
            saveBtn.innerHTML = "Save"
            $(divform).append(saveBtn)
            const modal = $('.modal') 
            modal.append(divform)
            
        },
        events: function() {
            var cachedThis = this    //https://stackoverflow.com/questions/9749969/in-javascript-how-can-i-call-one-prototype-method-in-another-prototype-method
            var _self = $(".checkin")
            var defaults = this.defaults
            var liEle = $(".calendarList").find("li")
            liEle.click(function(event) {
                event.preventDefault()
                //not checked in
                if ($(this).hasClass('able-checkin') && !$(this).hasClass('checked')) {
                    $(this).addClass('checked')    
                    cachedThis.modal(_self)
                    this.isChecked = true
                    var day = new Date().getDate()
                    if (!defaults.dateArray.includes(day))
                        defaults.dateArray.push(day)
                    console.log(defaults.dateArray)
                }//has checked in
                else{
                    console.log("checked")
                }
            })
            const checkBtn = $(".checkBtn")
            checkBtn.click(function() {
                if (!$('.able-checkin').hasClass('checked')) {
                    cachedThis.modal(_self)
                    $('.able-checkin').addClass('checked')
                    this.isChecked = true
                    var day = new Date().getDate()
                    if (!defaults.dateArray.includes(day))
                        defaults.dateArray.push(day)
                    console.log(defaults.dateArray)
                }
                else
                    console.log("already checked")
            })

        } 
    }
    global.Checkin = global.Checkin || Checkin

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.


