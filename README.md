# How to use

1) In your directive code change "sampleApp.directive"  to "yourAppName.directive"
2) Insert this code to your html template or separate html file. If you use separate html file remove tags scripts and set path to file in templateUrl in picker.js
```sh
 <script type='text/ng-template' id='calendar-template'>
    		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    		<link type="text/css" rel="stylesheet" href="css/calendar.css">
    		<div class="calendar" ng-show="showPicker">
    			<div class="calendar-header">
					<input type="text" disabled class="picker-input input-date" ng-model="userDate" placeholder="DD/MM/YYYY" />
					<input ng-click="userTime=''" type="text" class="picker-input input-time" ng-model="userTime" ng-change="userTime=timeFormat(userTime)" placeholder="HH:mm" />					
				</div>
				<div class="info">
						<button class="month-switch month-prev" ng-click="prevMonth(today)">&lsaquo;</button>
						{{date}}
						<button class="month-switch month-next" ng-click="nextMonth(today)">&rsaquo;</button>
					</div>
				<div class="calendar-body">
					<div class="weekNames"></div><div class="days"></div>
				</div>
				<button class="picker-undo-btn" ng-click="undoSelect()">Отменить</button>
    			<button class="picker-confirm-btn" ng-click="setDate()">&check;</button>
    		</div>   		
	</script>
```
3) Include picker.js and calendar.css files
4) For using picker place next code for input
```sh
	<input ng-click="pickerShow=!pickerShow" ng-model="dateTime" type="text">
	<calendar></calendar>
```
Good luck)
