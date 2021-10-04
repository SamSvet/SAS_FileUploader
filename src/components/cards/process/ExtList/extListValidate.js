export default function extListValidate(values) {
    let errors = {}
    if (!("fileParamsType" in values)){ return {"fileParamsType": {errDesc:"Select process"}}}
    if ( values.fileParamsType[0].VALUE !== 'import_ext_lists' ) return {}
    if (!("selectChecks" in values)){
        errors.selectChecks = {errDesc:"No checks selected "}
    }

    return errors
}