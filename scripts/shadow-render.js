//shim process var since we aren't in webpack
var process = process || {};
process.env = process.env || {};
process.env.NODE_ENV = 'development';
process.env.shimShadow = "false";

const isShadowDomAvailable = document.head.attachShadow && process.env.shimShadow === "false" ? true : false;
 
HTMLElement.prototype.render = HTMLElement.prototype.render || function( templateString, forceShadowDom = false ) {
    // Check if either shadow-dom is available or if a force override is requested
  // Render the component by DOM manipulation
  const instance = document.createElement( "div" );
  instance.innerHTML = templateString;
  const slotNode = instance.querySelector( "slot" );
  if ( slotNode ) {
      const childNodes = Array.prototype.slice.call( this.childNodes );
      const childNodeLength = childNodes.length;
      for ( let count = 0; count < childNodeLength; count++ ) {
          const element = childNodes[count];
          slotNode.appendChild( element );
      }
  }
  this.innerHTML = instance.innerHTML;
}

console.log('shadow-render.js loaded')
