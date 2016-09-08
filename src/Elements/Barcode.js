/*jshint esversion: 6 */
/*
Element.js
========
Base class for all label elements
*/
import _ from 'underscore';
import Element from './Element';

export default class Barcode extends Element{

   constructor(type, x, y, narrow, width, height, rotation, readable, data){
      super();
      this.barType = {'CODE39': 'A', 'EAN8': 'B', 'EAN13':'E', 'UPCA':'H', 'UPCE':'K', 'CODE93':'P', 'CODE128':'Q'};
      this.xStart = x;
      this.yStart = y;
      this.narrow = narrow;
      this.data = data;
   }

   getPrintCommand(dpi=203){
      super();
      var   xStartDot = this.toDot(this.xStart, dpi),
            yStartDot = this.toDot(this.yStart, dpi),
            sizePoint = Math.floor(this.size * 2.84),
            i = [6, 8, 10, 12, 14, 18, 24, 30],
            j = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

      var k = _.map(i, function(num){ return Math.abs(num - sizePoint); });
      var l = _.lastIndexOf(k, _.min(k));
      return `A${j[l]},${xStartDot},${yStartDot},1,1,1,0,${text}\n`;
   }
}