"use strict";var _tool=_interopRequireDefault(require("./tool"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectSpread(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){_defineProperty(a,b,c[b])})}return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var rectangle=_objectSpread({},_tool.default);rectangle.name="Rectangle",rectangle.onMouseDown=function(a,b){this.ctx.strokeStyle=b.color,this.ctx.fillStyle="rgba(255,0,0, 0.1)",this.ctx.lineWidth=5,this.setInitSettings({start:a,options:b})},rectangle.draw=function(a,b,c,d){!1===c&&(this.ctx.fillStyle="rgba(255,0, 0, 0.1)",this.ctx.lineWidth=5,this.setInitSettings({start:a,options:d.options})),this.ctx.fillRect(a.x,a.y,b.x-a.x,b.y-a.y),this.ctx.strokeRect(a.x,a.y,b.x-a.x,b.y-a.y)},rectangle.onMouseMove=function(a){this.state&&this.state.started&&(this.ctx.putImageData(this.imageData,0,0),this.draw(this.state.start,a))},rectangle.onMouseUp=function(a,b){if(this.state){var c=[[this.state.start.x,this.state.start.y],[this.state.start.x,a.y],[a.x,a.y],[a.x,this.state.start.y]],d=this.state.start,e=this.state.options;return this.state.started=!1,b(),{data:c,canvas:{start:d,end:a,options:e}}}};var _default=rectangle;exports.default=_default;