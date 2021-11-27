export default function validateProcess(values) {
    let errors = {}
    if (!("fileParamsType" in values)){ return {fileParamsType: {errDesc:"Select process"}}}
    // if ( values.fileParamsType[0].VALUE !== 'sashelp_cars' ) return {}
    if (!("selectChecks" in values)){
        errors.selectChecks = {errDesc:"Select checks"}
    }

    if (!("fileInput" in values)){
        return {fileInput: {errDesc:"Select file"}}
    }

    if ("selectChecks" in values){
        const distinctChecks = values.selectChecks
            .filter(el => el.COLUMNS)
            .flatMap(el => el.COLUMNS.split(','))
            .filter((value, index, self) => self.indexOf(value) === index)
        const diff = distinctChecks.filter(x => !values.fileInput.sheet[0].meta.fields.includes(x))
        if (diff.length){
            return {fileInput:{errDesc:`File is missing fields - ${diff.join(',')}`}}
        }
    }

    if ("fileParamsType" in values){
        const targetColumns = values.fileParamsType.flatMap(el => el.COLUMNS.split(','))
        const diff = values.fileInput.sheet[0].meta.fields.filter(x => !targetColumns.includes(x))
        if (diff.length){
            return {fileInput:{errDesc:`The uploaded file contains fields that are not in ${values.fileParamsType[0].TARGET_TABLE}`, errData:diff}}
        }
    }

    return errors
}