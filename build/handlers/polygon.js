"use strict";var _tool=_interopRequireDefault(require("./tool"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.POLYGON=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectSpread(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){_defineProperty(a,b,c[b])})}return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var POLYGON="Polygon";exports.POLYGON="Polygon";var polygon=_objectSpread({},_tool.default);polygon.name="Polygon",polygon.onMouseDown=function(a,b){this.state||(this.state=_objectSpread({},this.state,{initialCircle:this.createStartPoint(a,5),startPoint:a,polygonFillColor:b.polygonFillColor})),this.state.pathData||(this.state.pathData=[]),this.ctx.fillStyle=b.color,this.setInitSettings({start:a,options:b})},polygon.onMouseMove=function(a,b){this.state&&this.state.started&&(this.ctx.putImageData(this.imageData,0,0),this.draw(this.state.start,a),this.ctx.isPointInPath(this.state.initialCircle,a.x,a.y)&&0<this.state.canvasData.length&&3<=this.state.pathData.length&&(this.fillGeometry(this.state.pathData,this.state.polygonFillColor),this.resetState(),b()))},polygon.fillGeometry=function(a,b){var c=new Path2D,d=a[0][0];c.moveTo(d[0],d[1]),a.forEach(function(b,d){a[d+1]?c.lineTo(a[d+1][0],a[d+1][1]):c.lineTo(a[0][0],a[0][1])}),this.ctx.fillStyle=b,this.ctx.fill(c)},polygon.onMouseUp=function(a){if(this.state){var b=[this.state.start.x,this.state.start.y];this.state.pathData.push(b),this.state.canvasData.push(b);var c=this.state.start,d=this.state.options;return{data:b,canvas:{start:c,end:a,options:d}}}};var _default=polygon;exports.default=_default;