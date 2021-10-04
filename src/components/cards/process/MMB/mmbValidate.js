export default function mmbValidate(values) {
    let errors = {}

    if (!("fileParamsType" in values)){ return {"fileParamsType": "Необходимо выбрать процесс"}}
    if ( values.fileParamsType[0].VALUE !== 'import_ext_lists_MMB' ) return {}

    if (!("selectActivityType" in values) || Object.keys(values.selectActivityType).length === 0
        // || values.selectActivityType.constructor === Object
    ){
        errors.selectActivityType = {errDesc:"Тип активности не выбран"}
    }
    if (!("selectSaleChannel" in values) || Object.keys(values.selectSaleChannel).length === 0
    ){
        errors.selectSaleChannel = {errDesc:"Каналы продаж не выбраны"}
    }
    if (!("selectCampCode" in values) || Object.keys(values.selectCampCode).length === 0
    ){
        errors.selectCampCode = {errDesc:"Код кампании продаж не выбран"}
    }
    return errors
}