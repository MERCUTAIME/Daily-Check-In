// var showself
// var showself1
// var showself2

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
        dateArray: [3, 5, 10, 15]
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
        }).append("<div class='title'><p>" + text + "</p><a class=\'checkBtn\' href=\"javascript:\">Check In</a></div>")
        $("<ul class='week clearfix'></ul><ul class='calendarList clearfix'></ul>").appendTo(_self)
        //showself1 = _self
        for (var i = 0; i < 7; i++) {
            _self.find(".week").append("<li>" + week[i] + "</li>")
        }
        for (var i = 0; i < 42; i++) {
            html += "<li></li>"
        }
        _self.find(".calendarList").append(html)
        var liEle = _self.find(".calendarList").find("li")
        _self.find(".week li").css({
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
        _self.find(".calendarList").find("li:nth-child(7n)").css('borderRight', 'none')
        _self.find(".week li:nth-child(7n)").css('borderRight', 'none')
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
                    }
                }
            }
        }
    
        _self.find($(".day" + day)).addClass('able-checkin')
    },
    modal : function(e) {
        var mask = e.parents().find(".mask")
        var close = e.parents().find(".closeBtn")
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
        e.parents().find('.checkBtn').text("Checked In")

        const divform = document.createElement('div')
        const textbox = document.createElement('form')
        $(divform).addClass("form")
		$(textbox).append("<label class='boxtitle'>record your mood today</label> <textarea class='box'></textarea>")
        $(divform).append(textbox)
        $(divform).append("<a class=\'saveBtn\' href=\"javascript:\">Save</a>")
		const modal = $('.modal') // jQuery equivalent to: const body = document.querySelector('body')
		modal.append(divform)
        
    },
    events : function() {
        var cachedThis = this    //https://stackoverflow.com/questions/9749969/in-javascript-how-can-i-call-one-prototype-method-in-another-prototype-method
        var _self = this.ele
        var liEle = _self.find(".calendarList").find("li")
        liEle.on('click', function(event) {
            event.preventDefault()
            /* Act on the event */
            if ($(this).hasClass('able-checkin')) {
                $(this).addClass('checked')
                cachedThis.modal(_self)
                this.isChecked = true
            }
        })
        var checkBtn = _self.find(".checkBtn")
        checkBtn.click(function() {
            cachedThis.modal(_self)
            _self.find('.able-checkin').addClass('checked')
            this.isChecked = true
        })
    } 
}





