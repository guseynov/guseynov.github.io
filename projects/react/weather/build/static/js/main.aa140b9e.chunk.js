(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{13:function(e,a,t){e.exports=t(38)},19:function(e,a,t){},38:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(12),s=t.n(c),o=t(2),i=(t(19),t(20)),u=[];var d=function(){var e=function(e){var a=Object(r.useState)({loaded:!1,error:!1}),t=Object(o.a)(a,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){if(!u.includes(e)){u.push(e);var a=document.createElement("script");a.src=e,a.async=!0;var t=function(){c({loaded:!0,error:!1})},r=function(){var t=u.indexOf(e);t>=0&&u.splice(t,1),a.remove(),c({loaded:!0,error:!0})};return a.addEventListener("load",t),a.addEventListener("error",r),document.body.appendChild(a),function(){a.removeEventListener("load",t),a.removeEventListener("error",r)}}c({loaded:!0,error:!1})}),[e]),[n.loaded,n.error]}("https://maps.googleapis.com/maps/api/js?key=AIzaSyD6LXWmuCKyJpkTSxleL7oTRIh1qpFdXWA&libraries=places"),a=Object(o.a)(e,2),t=a[0],c=(a[1],Object(r.useState)("")),s=Object(o.a)(c,2),d=s[0],l=s[1],p=Object(r.useState)(""),m=Object(o.a)(p,2),h=m[0],f=m[1],y=Object(r.useState)(!1),b=Object(o.a)(y,2),g=b[0],v=b[1],E=Object(r.useState)([]),_=Object(o.a)(E,2),w=_[0],j=_[1],k=Object(r.useState)([]),O=Object(o.a)(k,2),S=O[0],N=O[1],C=function(e){l(e.target.textContent),f(e.target.textContent),v(!1);var a=encodeURIComponent(e.target.textContent);i.get("https://api.openweathermap.org/data/2.5/forecast?q="+a+"&mode=json&appid=12975cb5d84452a454240c06140fbbc9").then((function(e){for(var a={Sunday:{hours:{},icon:""},Monday:{hours:{},icon:""},Tuesday:{hours:{},icon:""},Wednesday:{hours:{},icon:""},Thursday:{hours:{},icon:""},Friday:{hours:{},icon:""},Saturday:{hours:{},icon:""}},t=0;t<e.data.list.length;t++){var r=new Date(1e3*e.data.list[t].dt),c=e.data.list[t].weather[0].icon,s=Number(e.data.list[t].main.temp)-273.15;switch(r.getDay()){case 0:a.Sunday.hours[r.getHours()]={temp:s},a.Sunday.icon=c;break;case 1:a.Monday.hours[r.getHours()]={temp:s},a.Monday.icon=c;break;case 2:a.Tuesday.hours[r.getHours()]={temp:s},a.Tuesday.icon=c;break;case 3:a.Wednesday.hours[r.getHours()]={temp:s},a.Wednesday.icon=c;break;case 4:a.Thursday.hours[r.getHours()]={temp:s},a.Thursday.icon=c;break;case 5:a.Friday.hours[r.getHours()]={temp:s},a.Friday.icon=c;break;case 6:a.Saturday.hours[r.getHours()]={temp:s},a.Saturday.icon=c}}var o=[];for(var i in a)if(0!==Object.entries(a[i].hours).length){var u=[];for(var d in a[i].hours)u.push(n.a.createElement("div",{key:d,className:"forecast-card__entry"},n.a.createElement("span",{className:"forecast-card__hour"},d,":00"),n.a.createElement("span",{className:"forecast-card__temperature"},Math.round(a[i].hours[d].temp),"\xb0C")));o.push(n.a.createElement("div",{key:i,className:"forecast-card"},n.a.createElement("p",{className:"forecast-card__day"},i),n.a.createElement("img",{className:"forecast-card__image",alt:"",src:"https://openweathermap.org/img/w/"+a[i].icon+".png"}),n.a.createElement("div",{className:"forecast-card__entries"},u)))}N(o)}))};return n.a.createElement("form",{onSubmit:function(e){e.preventDefault()},className:"weather-app"},n.a.createElement("header",{className:"weather-app__header"},n.a.createElement("h1",{className:"weather-app__title"},"Weather forecast for"),n.a.createElement("input",{value:h||d,onKeyDown:function(e){"Backspace"===e.key&&f("")},onChange:function(e){return function(e){if(l(e.target.value),d.length>3&&t){(new window.google.maps.places.AutocompleteService).getQueryPredictions({input:d},(function(e){e&&e.length>0?(j(e.map((function(e,a){return n.a.createElement("li",{key:a,onClick:C,className:"weather-app-cities-list__item"},e.description)}))),v(!0)):v(!1)}))}}(e)},className:"weather-app__input",type:"text",placeholder:"enter city name"}),n.a.createElement("ul",{className:"weather-app__cities-list weather-app-cities-list "+(g?"active":"")},w)),n.a.createElement("div",{className:"forecast-cards"},S))};s.a.render(n.a.createElement(d,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.aa140b9e.chunk.js.map