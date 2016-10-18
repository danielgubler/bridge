var Enum = function(symbols, base) {
  this._symbolKeys = []
  for (var i = 0; i < symbols.length; i++) {
    var symbolBase = symbols[i]
    var symbol = {
      toJSON: function() { return String(this.value) }
    }

    if ((typeof symbolBase) == 'string') {
      symbol.name = symbolBase
      symbol.value = Math.pow(2, i)
    } else if (Array.isArray(symbolBase)) {
      symbol.name = symbolBase[0]
      symbol.value = symbolBase[1]
    } else {
      symbol = symbolBase
      symbol.value = symbol.value || Math.pow(2, i)
    }

    if (base) {
      for (var attr in base) {
        Object.defineProperty(symbol, attr, { get: base[attr] })
      }
    }

    Object.freeze(symbol)
    this[symbol.name] = symbol
    this._symbolKeys.push(symbol.name)
  }

  Object.freeze(this)
}

Enum.prototype.fromValue = function(val) {
  return this.from('value', val)
}

Enum.prototype.fromName = function(name) {
  return this.from('name', name)
}

Enum.prototype.from = function(attr, val) {
  for (var i = 0; i < this._symbolKeys.length; i++) {
    var sym = this[this._symbolKeys[i]]
    if (sym && sym[attr] == val) { return sym }
  }
  return null
}

Object.defineProperty(Enum.prototype, 'keys', { get: function() { return this._symbolKeys.slice() } })
