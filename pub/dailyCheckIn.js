function $$$ ($) {
    var Checkin = function(ele, options) {
        this.ele = ele;
        this.opt = options;
        this.defaults = {
            width: 450,
            height: 'auto',
            background: '#d8efff',
            radius: 10,
            color: '#000000',
            padding: 10,
            dateArray: [3, 5, 20, 21], 
        };
        this.obj = $.extend({}, this.defaults, this.opt);
    }
    Checkin.prototype.init = function() {
        var _self = this.ele,
            html = '',
            myDate = new Date(),
            year = myDate.getFullYear(),
            month = myDate.getMonth(),
            day = myDate.getDate(),
            weekText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            text = '';
            switch (month +1){
                case 1:
                    text = 'January';
                    break;
                case 2:
                    text = "February";
                    break;
                case 3:
                    text = "March";
                    break;
                case 4:
                    text = "April";
                    break;
                case 5:
                    text = "May";
                    break;
                case 6:
                    text = "June";
                    break;
                case 7:
                    text = "July";
                    break;
                case 8:
                    text = "August";
                    break;
                case 9:
                    text = "September";
                    break;
                case 10:
                    text = "October";
                    break;
                case 11:
                    text = "November";
                    break;
                case 12:
                    text = "December";
                    break;
            }
        _self.css({
            width: this.obj.width + 'px',
            height: this.obj.height,
            background: this.obj.background,
            borderRadius: this.obj.radius,
            color: this.obj.color,
            padding: this.obj.padding
        }).append("<div class='title'><p>" + text + "</p><a class=\'checkBtn\' href=\"javascript:;\">Check In</a></div>");
        $("<ul class='week clearfix'></ul><ul class='calendarList clearfix'></ul>").appendTo(_self);
        for (var i = 0; i < 7; i++) {
            _self.find(".week").append("<li>" + weekText[i] + "</li>")
        };
        for (var i = 0; i < 42; i++) {
            html += "<li></li>"
        };
        _self.find(".calendarList").append(html);
        var $li = _self.find(".calendarList").find("li");
        _self.find(".week li").css({
            width: (_self.width() / 7) + 'px',
            height: 50 + 'px',
            borderRight: '1px solid #000000',
            borderBottom: '1px solid #000000',
            boxSizing: 'border-box',
            background: '#fff'
        });
        $li.css({
            width: (_self.width() / 7) + 'px',
            height: 50 + 'px',
            borderRight: '1px solid #000000',
            borderBottom: '1px solid #000000',
            boxSizing: 'border-box',
            color: "#000000"
        });
        _self.find(".calendarList").find("li:nth-child(7n)").css('borderRight', 'none');
        _self.find(".week li:nth-child(7n)").css('borderRight', 'none');
        var monthFirst = new Date(year, month, 1).getDay();
        var d = new Date(year, (month + 1), 0)
        var totalDay = d.getDate(); 
        for (var i = 0; i < totalDay; i++) {
            $li.eq(i + monthFirst).html(i + 1);
            $li.eq(i + monthFirst).addClass('data' + (i + 1))
            if (isArray(this.obj.dateArray)) {
                for (var j = 0; j < this.obj.dateArray.length; j++) {
                    if (i == this.obj.dateArray[j]) {
                        
                        $li.eq(i + monthFirst).addClass('checked');
                    }
                }
            }
        }
       
        _self.find($(".data" + day)).addClass('able-checkin');
    }
    var isChecked = false;
    Checkin.prototype.events = function() {
        var _self = this.ele;
        var $li = _self.find(".calendarList").find("li");
        $li.on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            if ($(this).hasClass('able-checkin')) {
                $(this).addClass('checked');
                modal(_self);
                isChecked = true;
            }
        });
        var checkBtn = _self.find(".checkBtn");
        checkBtn.click(function(event) {
            modal(_self);
            _self.find('.able-checkin').addClass('checked');
            isChecked = true;
        });
    }
    var modal = function(e) {
        var mask = e.parents().find(".mask");
        var close = e.parents().find(".closeBtn");
        if (mask && !isChecked) {
            mask.addClass('trf');
        } else {
            return
        };
        close.click(function(event) {
            event.preventDefault();
            mask.removeClass('trf')
        });
        e.parents().find('.checkBtn').text("Checked In");
    }
    $.fn.Checkin = function(options) {
        var checkin = new Checkin(this, options);
        var obj = [checkin.init(), checkin.events()]
        return obj
    }
    var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
    
    console.log("ran");
    return $$$;
}

