import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function AutoWidth (ws, arr) {
  // 设置worksheet每列的最大宽度
  const colWidth = arr.map(row => row.map(val => {
    // 判断是否为null/undefined
    if (val == null) {
      return {'wch': 10}
    } else if (val.toString().charCodeAt(0) > 255) { // 判断是否为中文
      return {'wch': val.toString().length * 2}
    } else {
      return {'wch': val.toString().length}
    }
  }))
  // 以第一行为初始值
  let result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
}

function formatJson (key, data) {
  return data.map(v => key.map(i => { return v[i] }))
}

// 字符串转ArrayBuffer
function s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

export function exportDataFromExcel (
  {
    multiHeader = [],
    header,
    key,
    data,
    fileName,
    merges = [],
    autoWidth = true,
    bookType = 'xlsx'
  } = {}) {
  const wb = XLSX.utils.book_new()
  const arr = formatJson(key, data)
  fileName = fileName || 'excel-list'
  arr.unshift(header)
  for (let i = multiHeader.length - 1; i > -1; i--) {
    arr.unshift(multiHeader[i])
  }
  const ws = XLSX.utils.aoa_to_sheet(arr)
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  if (autoWidth) {
    AutoWidth(ws, arr)
  }
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  let wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${fileName}.${bookType}`)
}

export default {
  exportDataFromExcel
}
