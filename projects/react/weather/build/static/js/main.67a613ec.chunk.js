(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{17:function(e,t,a){e.exports=a(42)},23:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),i=a(12),n=a.n(i),c=a(13),o=a(14),u=a(2),l=a(16),h=a(15),p=(a(23),a(24)),m=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).removeCity=function(){s.setState({city:""})},s.chooseCity=function(e){s.setState({inputValue:e.target.textContent,city:e.target.textContent,citiesListVisible:!1},(function(){var e=Object(u.a)(s),t=encodeURIComponent(s.state.city.trim());p.get("https://api.openweathermap.org/data/2.5/forecast?q="+t+"&mode=json&appid=12975cb5d84452a454240c06140fbbc9").then((function(t){for(var a={Sunday:{hours:{},icon:""},Monday:{hours:{},icon:""},Tuesday:{hours:{},icon:""},Wednesday:{hours:{},icon:""},Thursday:{hours:{},icon:""},Friday:{hours:{},icon:""},Saturday:{hours:{},icon:""}},s=0;s<t.data.list.length;s++){var i=new Date(1e3*t.data.list[s].dt),n=t.data.list[s].weather[0].icon,c=Number(t.data.list[s].main.temp)-273.15;switch(i.getDay()){case 0:a.Sunday.hours[i.getHours()]={temp:c},a.Sunday.icon=n;break;case 1:a.Monday.hours[i.getHours()]={temp:c},a.Monday.icon=n;break;case 2:a.Tuesday.hours[i.getHours()]={temp:c},a.Tuesday.icon=n;break;case 3:a.Wednesday.hours[i.getHours()]={temp:c},a.Wednesday.icon=n;break;case 4:a.Thursday.hours[i.getHours()]={temp:c},a.Thursday.icon=n;break;case 5:a.Friday.hours[i.getHours()]={temp:c},a.Friday.icon=n;break;case 6:a.Saturday.hours[i.getHours()]={temp:c},a.Saturday.icon=n}}var o=[];for(var u in a)if(0!==Object.entries(a[u].hours).length){var l=[];for(var h in a[u].hours)l.push(r.a.createElement("div",{key:h,className:"forecast-card__entry"},r.a.createElement("span",{className:"forecast-card__hour"},h,":00"),r.a.createElement("span",{className:"forecast-card__temperature"},Math.round(a[u].hours[h].temp),"\xb0C")));o.push(r.a.createElement("div",{key:u,className:"forecast-card"},r.a.createElement("p",{className:"forecast-card__day"},u),r.a.createElement("img",{className:"forecast-card__image",alt:"",src:"https://openweathermap.org/img/w/"+a[u].icon+".png"}),r.a.createElement("div",{className:"forecast-card__entries"},l)))}e.setState({forecast:o})}))}))},s.updateInputValue=function(e){s.setState({inputValue:e.target.value},(function(){if(s.state.inputValue.length>3){var e=Object(u.a)(s);p.get("https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix="+s.state.inputValue).then((function(t){t.data.data.length>0&&e.setState({citiesList:t.data.data.map((function(t,a){return r.a.createElement("li",{key:a,onClick:e.chooseCity,className:"weather-app-cities-list__item"},t.name+", "+t.country)})),citiesListVisible:!0})}))}else s.setState({citiesListVisible:!1})}))},s.state={inputValue:"",city:"",citiesListVisible:!1,citiesList:[],forecast:[]},s}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:function(e){e.preventDefault()},className:"weather-app"},r.a.createElement("header",{className:"weather-app__header"},r.a.createElement("h1",{className:"weather-app__title"},"Weather forecast for"),r.a.createElement("input",{value:this.state.city||this.state.inputValue,onKeyDown:function(t){"Backspace"===t.key&&e.removeCity()},onChange:function(t){return e.updateInputValue(t,t.key)},className:"weather-app__input",type:"text",placeholder:"enter city name"}),r.a.createElement("ul",{className:"weather-app__cities-list weather-app-cities-list "+(this.state.citiesListVisible?"active":"")},this.state.citiesList)),r.a.createElement("div",{className:"forecast-cards"},this.state.forecast))}}]),a}(r.a.Component);n.a.render(r.a.createElement(m,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.67a613ec.chunk.js.map