// Import the component SASS
//import "./product-name.sass"; //not needed right now
 
// Import the isShadowDomAvailable variable. This will also add the "render" function to HTMLElement
//import isShadowDomAvailable from "@wc-util/shadow-render";
 
// Import the component template
//import getTemplate from "./product-name.template";
 
 
// Define & export the component class
class ProductName extends HTMLElement {
    /**
     * Called when the element is created or upgraded
     */
    constructor() {
        super();
    }
 
    getTemplate( templateData ) {
        return `<div><h1>${templateData.productName}</h1><div>Product details here</div></div>`;
    }

    // Monitor the data attribute for changes.
    static get observedAttributes() {
        return ["productName"];
    }

    /**
     * Update the product name based on data attribute changes
     * @param attr {String} attribute name
     * @param oldValue {String} old value
     * @param newValue {String} new value
     **/
    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr, oldValue, newValue)
        if (this.connected === true) {
            if (this._isDataValid(newValue)) {
                if (attr === "productName") {
                    this.templateData.productName = newValue;
                    this.querySelector("h1").textContent = newValue;
                }
            //kinda goofy, should be a constant though
            } else if (process.env.NODE_ENV !== this.ENV_PRODUCTION) {
                throw {
                    message: "Invalid input parameter value",
                    error: -1
                };
            }
        }
    }
 
    /**
     * Called when the element is inserted into a document, including into a shadow tree
     * @return nothing
     */
    connectedCallback() {
      try {
          this.render(this.getTemplate(this._getAttributeData()));
          this.connected = true;
      } catch (err) {
          if (process.env.NODE_ENV !== "production") {
              throw err;
          }
      }
    }
 
    /**
     * Get data attributes for template generation
     * @return templateData {Object} data attributes for template
     * @throws error {Object} error object with message and error code
     **/
    _getAttributeData() {
        console.log("product-name._getAttributeData")
        this.templateData = this.templateData || {
            productName: this.getAttribute("productName")
        };
        console.log("product-name._getAttributeData.tempateData:", this.templateData);
        return this.templateData;
    }
 
    /**
     * MOVE THIS OUT!!! Function name is wrong, existence does not equal validity
     * Check if the data is valid or not
     * @param value {String} value to be tested
     * @return boolean {Boolean} true if value is valid, false if data is invalid.
     **/
    _isDataValid(value) {
        // Test for null, undefined and blank strings. In addition, the client
        // can change the data attribute; hence, check for string null and undefined as well.
        return value !== null && typeof value !== "undefined" && value !== "" && value !== "null" && value !== "undefined";
    }
 
 
}
 
// Define the custom element
customElements.define( "product-name", ProductName );
