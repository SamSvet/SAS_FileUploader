export default function fileValidateInfo(values) {
    if (!("fileInput" in values)){
        return {fileInput: {errDesc:"You should select a file"}}
    }

    if ("selectChecks" in values){
        const distinctChecks = values.selectChecks
            .filter(el => el.COLUMNS)
            .flatMap(el => el.COLUMNS.split(','))
            .filter((value, index, self) => self.indexOf(value) === index)
        const diff = distinctChecks.filter(x => !values.fileInput.meta.fields.includes(x))
        if (diff.length){
            return {fileInput:{errDesc:`The file is missing fields - ${diff.join(',')}`}}
        }
    }

    if ("fileParamsType" in values){
        const targetColumns = values.fileParamsType.flatMap(el => el.COLUMNS.split(','))
        const diff = values.fileInput.meta.fields.filter(x => !targetColumns.includes(x))
        if (diff.length){
            return {fileInput:{errDesc:`The uploaded file contains attributes that are not in ${values.fileParamsType[0].TARGET_TABLE}`, errData:diff}}
        }
    }

    return {}
}