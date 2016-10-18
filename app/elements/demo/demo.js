class DemoElement extends HTMLElement {
  createdCallback(){
    this.innerHTML = document.currentScript.ownerDocument.querySelector("template").innerHTML
    this._title = this.querySelector('h1')
    // var spn = this.querySelector('span');
    // var btn = this.querySelector('button');
    // btn.addEventListener('click',() => alert('The button '+btn.textContent+' had been clicked'));
  }

  attachedCallback(){
    // this.querySelector('#spn').innerHTML = this.btntext != null ? this.btntext : this.dataset['text'];
    // this.querySelector('#btn').textContent = this.btntext != null ? this.btntext : this.dataset['text'];
  }

  // set properties(prop) {
  //   this.btntext = prop.text;
  // }

  get text() {
    return this._title.innerText
  }

  set text(value) {
    this._title.innerText = value
  }
}

var Demo = document.registerElement("demo-element", DemoElement);

var myBtn = new Demo;
document.body.appendChild(myBtn);
