let id = "demo-element"
class DemoElement extends HTMLElement {
  createdCallback(){
    this.innerHTML = document.customElementTemplates[id].innerHTML
    this._title = this.querySelector('h1')
  }

  detachedCallback() { this._observer.disconnect() }
  attachedCallback() {
    this._observer = new MutationObserver((mutationRecords, observer) => { this._updateProperties() })
    this._observer.observe(this, { "attributes": true })
  }

  _updateProperties() {
    this.title = this.getAttribute("title")
  }

  get title() { return this._title.innerText }
  set title(value) { this._title.innerText = value }
}

document.customElementTemplates = document.customElementTemplates || {}
document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
document.registerElement(id, DemoElement);
