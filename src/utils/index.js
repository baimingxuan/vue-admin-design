/**
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 获取粘贴时的纯文本
 * @param e
 * @returns {string}
 */
export function getPlainText (e) {
  function uniform (str) {
    const _str = supportIE(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const arr = _str.split(/\r\n|\r|\n/)
    if (arr) {
      return arr.map(item => {
        if (item.length > 0) {
          return '<div>' + item + '</div>'
        }
        return '<div><br></div>'
      }).join('')
    }
    return _str
  }
  let innerText = ''
  const TAB = ' '.repeat(2)
  e.preventDefault()
  if (e.clipboardData) {
    innerText = (e.originalEvent || e).clipboardData.getData('text/plain').replace(/\t/g, TAB)
    document.execCommand('insertHtml', false, uniform(innerText))
  } else if (window.clipboardData) {
    innerText = window.clipboardData.getData('Text').replace(/\t/g, TAB)
    if (document.selection) {
      document.selection.createRange().pasteHTML(uniform(innerText))
    } else if (window.getSelection) {
      const sel = window.getSelection()
      const range = sel.getRangeAt(0)
      // 创建临时元素，使得TextRange可以移动到正确的位置
      const tempEl = document.createElement('span')
      tempEl.innerHTML = '&#FEFF;'
      range.deleteContents()
      range.insertNode(tempEl)
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(tempEl)
      tempEl.parentNode.removeChild(tempEl)
      textRange.pasteHTML(uniform(innerText))
      textRange.collapse(false)
      textRange.select()
    }
  }
  return uniform(innerText)
}

/**
 * IE中的p标签转换成div
 * @param str
 * @returns {*}
 */
export function supportIE (str) {
  return str.replace(/<(\/?)p>/g, '<$1div>')
}
