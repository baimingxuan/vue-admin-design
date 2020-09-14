import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// 自动宽度计算
function AutoWidth(ws, arr) {
  // 设置worksheet每列的最大宽度
  const colWidth = arr.map(row => row.map(val => {
    // 判断是否为null/undefined
    if (val == null) {
      return { wch: 10 }
    } else if (val.toString().charCodeAt(0) > 255) { // 判断是否为中文
      return { wch: val.toString().length * 2 }
    } else {
      return { wch: val.toString().length }
    }
  }))
  // 以第一行为初始值
  const result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j].wch < colWidth[i][j].wch) {
        result[j].wch = colWidth[i][j].wch
      }
    }
  }
  ws['!cols'] = result
}

// 数组转换成JSON
function formatJSON(key, data) {
  return data.map(v => key.map(i => { return v[i] }))
}

// 字符串转ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

// 导出EXCEL表格
export function exportDataToExcel(
  {
    header, // 表头名数组
    key, // 列对应字段数组
    data, // 需要导出数据的数组
    fileName, // 导出文件名
    autoWidth = true, // 是否自动宽度
    bookType = 'xlsx' // 导出文件格式
  } = {}) {
  // 创建Workbook对象
  const wb = XLSX.utils.book_new()
  const arr = formatJSON(key, data)
  fileName = fileName || 'excel-list'
  arr.unshift(header)
  // 将数组数据转换为worksheet
  const ws = XLSX.utils.aoa_to_sheet(arr)
  if (autoWidth) {
    AutoWidth(ws, arr)
  }
  // 向Workbook对象中追加worksheet和fileName
  XLSX.utils.book_append_sheet(wb, ws, fileName)
  // 生成EXCEL的配置项
  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  // 浏览器下载
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${fileName}.${bookType}`)
}

// 从Excel文件中获取表格头
function getHeaderRow(sheet) {
  const headers = []
  // 将 A1:G8 这种字符串转换为行列对象
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  // 从第一列开始，遍历范围中的每一列
  for (C = range.s.c; C <= range.e.c; ++C) {
    // 将行列对象转换为 A1 这种字符串
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    // 用默认值替换
    let hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

// 读取Excel文件
export function readDataFromExcel(data, type) {
  // 读取Excel文件并保存到Workbook对象
  const workbook = XLSX.read(data, { type: type })
  const firstSheetName = workbook.SheetNames[0]
  // 获取Workbook对象的worksheet
  const worksheet = workbook.Sheets[firstSheetName]
  const header = getHeaderRow(worksheet)
  // 将worksheet转化成数组
  const results = XLSX.utils.sheet_to_json(worksheet)
  return { header, results }
}

export default {
  exportDataToExcel,
  readDataFromExcel
}
