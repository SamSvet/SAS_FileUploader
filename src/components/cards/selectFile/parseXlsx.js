import * as XLSX from 'xlsx'

export const parseXlsx = async (file, rowsCnt=11) => {
    return new Promise((resolve,reject) => {
        var reader = new FileReader()
        reader.onload = function(e) {
            const wb = XLSX.read(e.target.result, {type:"binary", dateNF: 'dd/mm/yyyy;@', sheetRows: rowsCnt})
            const XL_row_object = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {defval:''})
            // resolve({data:XL_row_object, meta:{fields:Object.keys(XL_row_object[0])}, size:e.target.result.length, name:file.name})
            resolve(
                wb.SheetNames
                .map((sheet, i) => ({
                    data: XLSX.utils.sheet_to_json(wb.Sheets[sheet], {defval:'', raw: false}),
                    index: i
                }))
                .filter(filterElem => filterElem.data.length > 0)
                .map(res => ({...res, meta:{fields:Object.keys(res.data[0]), sheetName:wb.SheetNames[res.index]}}))
            )
        }

        reader.onerror = function (ex){
            reject(ex)
        }
        reader.readAsBinaryString(file)
    })

}