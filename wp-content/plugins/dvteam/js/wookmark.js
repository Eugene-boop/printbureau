/*!
wookmark plugin
@name wookmark.js
@author Christoph Ono (chri@sto.ph or @gbks)
@author Sebastian Helzle (sebastian@helzle.net or @sebobo)
@version 2.1.2
@date 05/05/2016
@category jQuery plugin
@copyright (c) 2009-2016 Christoph Ono (www.wookmark.com)
@license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
!function(a){!function(a){"function"==typeof define&&define.amd?define(a):a()}(function(){function c(a,b){return function(){return a.apply(b,arguments)}}function e(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a.style[c]=b[c])}function f(a,b){d(function(){var c,f;for(c=0;c<a.length;c++)f=a[c],e(f.el,f.css);"function"==typeof b&&d(b)})}function g(a){return a.replace(/^\s+|\s+$/g,"").toLowerCase()}function h(b,c,d){window.jQuery?a(b).off(c,d):b.removeEventListener?b.removeEventListener(c,d):b.detachEvent("on"+c,d)}function i(b,c,d){h(b,c,d),window.jQuery?a(b).on(c,d):b.addEventListener?b.addEventListener(c,d):b.attachEvent("on"+c,function(){d.call(b)})}function j(a){return null===a.offsetParent}function k(a){return a.offsetHeight}function l(a){return a.offsetWidth}function m(a,b){return a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function n(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function o(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function p(a,b,c,d){void 0===d&&(d="wookmark-");var e=a.getAttribute("data-"+d+b);return c===!0?parseInt(e,10):e}function q(a,b,c,d){void 0===d&&(d="wookmark-"),a.setAttribute("data-"+d+b,c)}function r(a){for(var d,b={},c=[],e=a.length;e--;)d=p(a[e],"id",!0),b.hasOwnProperty(d)||(b[d]=1,c.push(a[e]));return c}function s(a,b){return void 0!==window.getComputedStyle?window.getComputedStyle(a,null).getPropertyValue(b):a.currentStyle[b]}function t(a,b){var d,c=a.length;for(d=0;d<c;d++)if(a[d]===b)return d;return-1}function u(a,b){b=b||{},"string"==typeof a&&(a=document.querySelector(a)),this.container=a,this.columns=this.resizeTimer=null,this.activeItemCount=0,this.placeholders=[],this.itemHeightsInitialized=!1,this.itemHeightsDirty=!1,this.elementTag="div",this.initItems=c(this.initItems,this),this.updateOptions=c(this.updateOptions,this),this.onResize=c(this.onResize,this),this.onRefresh=c(this.onRefresh,this),this.getItemWidth=c(this.getItemWidth,this),this.layout=c(this.layout,this),this.layoutFull=c(this.layoutFull,this),this.layoutColumns=c(this.layoutColumns,this),this.filter=c(this.filter,this),this.clear=c(this.clear,this),this.getActiveItems=c(this.getActiveItems,this),this.refreshPlaceholders=c(this.refreshPlaceholders,this),this.sortElements=c(this.sortElements,this),this.updateFilterClasses=c(this.updateFilterClasses,this),this.initItems(),this.container.style.display="block",this.updateOptions(b),this.updateFilterClasses(),this.autoResize&&i(window,"resize",this.onResize),i(this.container,"refreshWookmark",this.onRefresh)}var b={align:"center",autoResize:!0,comparator:null,direction:void 0,ignoreInactiveItems:!0,inactiveClass:"wookmark-inactive",itemSelector:void 0,itemWidth:0,fillEmptySpace:!1,flexibleWidth:0,offset:5,outerOffset:0,onLayoutChanged:void 0,placeholderClass:"wookmark-placeholder",possibleFilters:[],resizeDelay:50,verticalOffset:void 0},d=window.requestAnimationFrame||function(a){a()};return u.prototype.initItems=function(){if(void 0===this.itemSelector){for(var b,a=[],c=this.container.children,d=c.length;d--;)b=c[d],8!==b.nodeType&&(b.style.display="",q(b,"id",d),a.unshift(b));this.items=a}else this.items=this.container.querySelectorAll(this.itemSelector);this.items.length&&(this.elementTag=this.items[0].tagName),this.itemHeightsDirty=!0},u.prototype.updateFilterClasses=function(){for(var b,d,e,f,j,a=this.items.length,c={},h=this.possibleFilters,i=h.length;a--;)if(e=this.items[a],d=JSON.parse(p(e,"filter-class",!1,"")),d&&"object"==typeof d)for(b=d.length;b--;)f=g(d[b]),c.hasOwnProperty(f)||(c[f]=[]),c[f].push(e);for(;i--;)j=g(h[i]),c.hasOwnProperty(j)||(c[j]=[]);this.filterClasses=c},u.prototype.updateOptions=function(a){var c;this.itemHeightsDirty=!0,a=a||{};for(c in b)b.hasOwnProperty(c)&&(a.hasOwnProperty(c)?this[c]=a[c]:this.hasOwnProperty(c)||(this[c]=b[c]));this.verticalOffset=this.verticalOffset||this.offset,this.layout(!0)},u.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!==this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},u.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},u.prototype.filter=function(a,b,c){var e,h,i,j,k,d=[],f=[];if(a=a||[],b=b||"or",c=c||!1,a.length){for(h=0;h<a.length;h++)k=g(a[h]),this.filterClasses.hasOwnProperty(k)&&d.push(this.filterClasses[k]);if(h=e=d.length,"or"===b||1===e)for(;h--;)f=f.concat(d[h]);else if("and"===b){for(var p,q,s,l=d[0],m=!0;h--;)d[h].length<l.length&&(l=d[h]);for(l=l||[],h=l.length;h--;){for(q=l[h],i=e,m=!0;i--&&m;)if(s=d[i],l!==s){for(p=!1,j=s.length;j--&&!p;)p=s[j]===q;m&=p}m&&(f=f.concat(l[h]))}}if(e>1&&(f=r(f)),!c)for(h=this.items.length;h--;)t(f,this.items[h])===-1&&n(this.items[h],this.inactiveClass)}else f=this.items;if(!c){for(h=f.length;h--;)o(f[h],this.inactiveClass);this.columns=null,this.layout()}return f},u.prototype.refreshPlaceholders=function(a,b){var c,g,h,i,j,m,n,d=k(this.container),f=this.columns.length,l="";if(this.placeholders.length<f){for(c=0;c<f-this.placeholders.length;c++)l+="<"+this.elementTag+' class="'+this.placeholderClass+'"/>';this.container.insertAdjacentHTML("beforeend",l),this.placeholders=this.container.querySelectorAll("."+this.placeholderClass)}for(i=this.offset+2*parseInt(s(this.placeholders[0],"border-left-width"),10)||0,i+=2*parseInt(s(this.placeholders[0],"padding-left"),10)||0,c=0;c<this.placeholders.length;c++)m=this.placeholders[c],g=this.columns[c],c>=f||0===g.length?m.style.display="none":(j=g[g.length-1],n=p(j,"top",!0)+p(j,"height",!0)+this.verticalOffset,h=Math.max(0,d-n-i),e(m,{position:"absolute",display:h>0?"block":"none",left:c*a+b+"px",top:n+"px",width:a-i+"px",height:h+"px"}))},u.prototype.getActiveItems=function(){var b,d,a=this.inactiveClass,c=[],e=this.items;if(!this.ignoreInactiveItems)return e;for(b=0;b<e.length;b++)d=e[b],m(d,a)||c.push(d);return c},u.prototype.getItemWidth=function(){var a=this.itemWidth,b=l(this.container)-2*this.outerOffset,c=this.flexibleWidth;if("function"==typeof a&&(a=this.itemWidth()),this.items.length>0&&(void 0===a||0===a&&!this.flexibleWidth)?a=l(this.items[0]):"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a)/100*b),c){"function"==typeof c&&(c=c()),"string"==typeof c&&c.indexOf("%")>=0&&(c=parseFloat(c)/100*b);var d=b+this.offset,e=Math.floor(.5+d/(c+this.offset)),f=Math.floor(d/(a+this.offset)),g=Math.max(e,f),h=Math.min(c,Math.floor((b-(g-1)*this.offset)/g));a=Math.max(a,h)}return a},u.prototype.layout=function(a,b){if(a||!j(this.container)){var h,n,c=this.getItemWidth(),d=c+this.offset,e=l(this.container),f=e-2*this.outerOffset,g=Math.floor((f+this.offset)/d),i=0,k=this.getActiveItems(),m=k.length;if(a||this.itemHeightsDirty||!this.itemHeightsInitialized){for(var o=0;o<m;o++)n=k[o],this.flexibleWidth&&(n.style.width=c+"px"),q(n,"height",n.offsetHeight);this.itemHeightsDirty=!1,this.itemHeightsInitialized=!0}g=Math.max(1,Math.min(g,m)),h=this.outerOffset,"center"===this.align&&(h+=Math.floor(.5+(f-(g*d-this.offset))>>1)),this.direction=this.direction||("right"===this.align?"right":"left"),i=a||null===this.columns||this.columns.length!==g||this.activeItemCount!==m?this.layoutFull(d,g,h):this.layoutColumns(d,h),this.activeItemCount=m,this.container.style.height=i+"px",this.fillEmptySpace&&this.refreshPlaceholders(d,h),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged(),"function"==typeof b&&b()}},u.prototype.sortElements=function(a){return"function"==typeof this.comparator?a.sort(this.comparator):a},u.prototype.layoutFull=function(a,b,c){var d,h,i,l,e=0,g=0,j=null,k=null,o=[],r=[],s="left"===this.align,t=this;for(this.columns=[],h=this.sortElements(this.getActiveItems()),i=h.length;o.length<b;)o.push(this.outerOffset),this.columns.push([]);for(;g<i;){for(d=h[g],j=o[0],k=0,e=0;e<b;e++)o[e]<j&&(j=o[e],k=e);q(d,"top",j),l=c,(k>0||!s)&&(l+=k*a),r[g]={el:d,css:{position:"absolute",top:j+"px"}},r[g].css[this.direction]=l+"px",o[k]+=p(d,"height",!0)+this.verticalOffset,this.columns[k].push(d),g++}return f(r,function(){m(t.container,"wookmark-initialised")||n(t.container,"wookmark-initialised")}),Math.max.apply(Math,o)},u.prototype.layoutColumns=function(a,b){for(var i,j,k,l,c=[],d=[],e=0,g=0,h=this.columns.length;h--;){for(i=this.outerOffset,c.push(i),j=this.columns[h],l=h*a+b,e=0;e<j.length;e++,g++)k=j[e],q(k,"top",i),d[g]={el:k,css:{top:i+"px"}},d[g].css[this.direction]=l+"px",i+=p(k,"height",!0)+this.verticalOffset;c[h]=i}return f(d),Math.max.apply(Math,c)},u.prototype.clear=function(){clearTimeout(this.resizeTimer);for(var a=this.placeholders.length;a--;)this.container.removeChild(this.placeholders[a]);h(window,"resize",this.onResize),h(this.container,"refreshWookmark",this.onRefresh)},void 0!==window.jQuery&&(jQuery.fn.wookmark=function(b){var c=this.length;if(void 0!==b&&b.container instanceof jQuery&&(b.container=b.container[0]),c>1)for(;c--;)a(this).eq(c).wookmark(b);else 1===c&&(this.wookmarkInstance?this.wookmarkInstance.updateOptions(b||{}):this.wookmarkInstance=new u(this[0],b||{}));return this}),window.Wookmark=u,u})}(jQuery);