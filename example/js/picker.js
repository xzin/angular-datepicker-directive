sampleApp.directive('calendar', function(){
    return {
        restrict: 'E',
        transclude: true,
        scope: true,
        templateUrl: 'calendar-template',
        link:function(scope, element, attrs) {
            scope.$parent.$watch('pickerShow', function(value){
                scope.showPicker=value;
            });
            scope.today=new Date();
            scope.date=showMonth(scope.today);
            scope.userTime=timeFormat(scope.today);
            setWeekNames();
            buildMonth(element,scope.today.getMonth(),scope.today.getFullYear());
            
            function setDate() {
                var days=angular.element(element[0].querySelectorAll('.days span'));
                days.bind('click',function(event) {
                    var date=this.getAttribute('data-day');   
                    if (date!=null) {            
                        angular.forEach(days, function(element){
                            element.classList.remove('active');
                        });
                        this.classList.toggle('active');
                        scope.$apply(function () {
                            scope.userDate=date+' '+scope.date;
                        });
                    }
                });
            }   
            function buildMonth(el,month,year) {
                var container=angular.element(element[0].querySelector('.days'));
                container.html('');
                var daysInMonth = new Date(year,month+1,1,-1).getDate();
                var margin=(new Date(year,month,1)).getDay();
                for (var i=0;i<margin;i++) {
                    container.append('<span>&nbsp;</span>');
                }
                for (var i=1;i<=daysInMonth;i++) {
                    container.append('<span data-day='+i+'>'+i+'</span>');
                }
                setDate();
            }
            function setWeekNames() {
                var weekNames=getWeeksName();
                var weekContainer=angular.element(element[0].querySelector('.weekNames'));
                weekNames.forEach(function(item, i, weekNames) {
                  weekContainer.append('<span>'+item+' </span>');
                });
               function getWeeksName() {
                    var i=0;
                    var weekNames=[];
                    while (i<7) {
                        var tempDate=new Date(0,0,i);
                         weekNames.push(tempDate.toLocaleString(window.navigator.language, {weekday: 'short'}));
                        i++;
                    }
                    return weekNames;
                } 
            }      
            function showMonth(date) {
                return date.toLocaleString(window.navigator.language, { month: "long" })+' '+date.getFullYear();
            }     

            function timeFormat(date) {
                var hours=date.getHours();
                var minutes=date.getMinutes();
                return (hours>9?hours:'0'+hours)+':'+(minutes>9?minutes:'0'+minutes);
            }
            scope.nextMonth=function(date) {
                scope.today=new Date(date.getFullYear(),(date.getMonth()+1),date.getDate());
                scope.date=showMonth(scope.today);
                buildMonth(element,(date.getMonth()+1),date.getFullYear());
            }
            scope.prevMonth=function(date) {
                scope.today=new Date(date.getFullYear(),(date.getMonth()-1),date.getDate());
                scope.date=showMonth(scope.today);
                buildMonth(element,(date.getMonth()-1),date.getFullYear());
            }
            scope.timeFormat=function(time) {
                if (time.replace(/[0-9:]/g,'').length>0) {
                    str= time.slice(0, -1);
                } else if(time.length>5) {
                    str= time.slice(0, -1);
                } else if (time.split(':').length>2) {
                    str= time.slice(0, -1);
                } else if(time.length==2) {
                    str=time>=24?'23:':time+':';
                } else if(time.slice(3,5)>59) {
                    str=time.split(':')[0]+':'+59;
                } else if (time.indexOf(':')>-1&&time.indexOf(':')!=2) {
                    var arr=time.split('');
                    arr.splice(1,1);                   
                    arr.splice(2,0,':');
                    str=arr.join('');
                } else if (time.indexOf(':')==-1&&time.length>2) {
                    var arr=time.split('');
                    arr.splice(2,0,':');
                    str=arr.join('');
                } else {
                    str=time;
                }
                return str;
            }
            scope.setDate=function() {
                if (scope.userDate&&scope.userTime)
                    scope.$parent.dateTime=scope.userDate+', '+scope.userTime;
            }
            scope.undoSelect=function() {
                scope.userDate='';
                scope.$parent.dateTime='';
            }
        }
    }
}); 