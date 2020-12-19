// var showself
// var showself1
// var showself2
var showsave
var showclose
var showcheck

var Checkin = function() {
    this.ele = $(".checkin")
    //calendar appearance
    this.defaults = {
        width: 450,
        height: 'auto',
        background: '#d8efff',
        radius: 10,
        color: '#000000',
        padding: 10,
        dateArray: [3, 5, 10, 15],
        records: {
            3:"Hello",
            5:"Hi"
        }
    }
    this.isChecked = false
    this.obj = this.defaults

}

Checkin.prototype = {

    init : function() {
        var _self = this.ele,
            html = '',
            currentDate = new Date(),
            year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            day = currentDate.getDate(),
            week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

            text = ''
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
        //showself = _self
        _self.css({
            width: this.obj.width + 'px',
            height: this.obj.height,
            background: this.obj.background,
            borderRadius: this.obj.radius,
            color: this.obj.color,
            padding: this.obj.padding
        }).append("<div class='title'><p>" + text + "</p><a class='checkBtn' href='javascript:'>Check In</a></div>")
        $("<ul class='week clearfix'></ul><ul class='calendarList clearfix'></ul>").appendTo(_self)
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
    },
    modal : function() {
        var defaults = this.defaults
        // console.log("defaults: "+ defaults)
        var mask = $(".mask")
        var close = $(".closeBtn")
        showclose = close
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
    events : function() {
        var cachedThis = this    //https://stackoverflow.com/questions/9749969/in-javascript-how-can-i-call-one-prototype-method-in-another-prototype-method
        var _self = this.ele
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
        var checkBtn = $(".checkBtn")
        showcheck = checkBtn
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





