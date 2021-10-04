import * as XLSX from 'xlsx'

export const parseXlsx = async (file, rowsCnt=11) => {
    return new Promise((resolve,reject) => {
        var reader = new FileReader()
        reader.onload = function(e) {
            const wb = XLSX.read(e.target.result, {type:"binary", sheetRows: rowsCnt})
            // const XL_row_object = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1, defval:''})
            const XL_row_object = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {defval:''})
            resolve({data:XL_row_object, meta:{fields:Object.keys(XL_row_object[0])}, size:e.target.result.length, name:file.name})
        }

        reader.onerror = function (ex){
            reject(ex)
        }
        reader.readAsBinaryString(file)
    })

}