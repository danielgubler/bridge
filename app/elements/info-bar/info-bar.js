{
  let id = "info-bar"
  class InfoBar extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, InfoBar)
}
