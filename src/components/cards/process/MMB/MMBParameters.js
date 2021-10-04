import React, {useContext, useState} from 'react'
import "../../../styles/floatLabel.css"
import "../fileParams.css"
import Select from "react-select"
import {customStyles, errorStyles, widthStyles} from "../../../DarkSelectStyle"
import "moment/locale/ru"
import {DateTimePicker} from "../../../DateTimePicker"
import useForm from "../../../../hooks/useForm"
import {useData} from "../../../../context/DataContext"
import "../../../styles/tooltip.css"
import {sasContext} from "../../../../context/adapterSAS/sasContext"
import {CheckBox} from "../../../CheckBox"
import {FloatLabelInput} from "../../../FloatLabelInput"


export const MMBParameters = ({channel}) => {
    const {errors, sasData, setSasValues} = useData()
    const {localData, handleChange, handleChangeDttm, handleChangeSelect, handleChangeCheck} = useForm()
    const [loadingState, setLoadingState] = useState({selectActivityType:false})
    const {callSAS} = useContext(sasContext)

    const handleFocus = (selectName) => {
        if (!sasData[selectName]){
            setLoadingState(prev => ({...prev, [selectName]: true}))
            callSAS(`/Apps/SASUploader/MMB/${selectName}`)
                .then(result => {
                    setLoadingState(prev => ({...prev, [selectName]: false}))
                    setSasValues(result)
                })
                .catch(err => {
                    setLoadingState(prev => ({...prev, [selectName]: false}))
                    // toastr.error(`Unable to request /Apps/SASUploader/MMB/${selectName}`)
                })
        }
    }

    const activeOptions = sasData.selectActivityType ? sasData.selectActivityType : [
        { LABEL: 'Текущие клиенты: Новые продажи', VALUE: '1' },
        { LABEL: 'Текущие клиенты: Расширение сотрудничества', VALUE: '2' },
        { LABEL: 'Текущие клиенты: Отток', VALUE: '3' },
        { LABEL: 'Текущие клиенты: Сервис', VALUE: '4' },
        { LABEL: 'Новые клиенты: Привлечение', VALUE: '5' },
        { LABEL: 'Текущие клиенты: Восстановление сотрудничества', VALUE: '6' },
        { LABEL: 'Текущие клиенты: Продление доверенности', VALUE: '7' },
        { LABEL: 'Текущие клиенты: Продление полномочий ЕИО', VALUE: '8' },
        { LABEL: 'Текущие клиенты: Завершение льготного периода', VALUE: '9' }
    ]

    const channelOptions = sasData.selectSaleChannel ? sasData.selectSaleChannel : [
        { LABEL: 'МКК', VALUE: 'MKK' },
        { LABEL: 'КММС', VALUE: 'KMMS' },
        { LABEL: 'АИСТ', VALUE: 'AIST' },
        { LABEL: 'СББОЛ', VALUE: 'SBBOL' },
        { LABEL: 'ГКМ', VALUE: 'GKM' }
    ]

    const campaignOptions = sasData.selectCampCode ? sasData.selectCampCode : new Array(100).fill('').map((_, i) => ({ VALUE : i+1, LABEL : `Campaign ${i+1}`}))

    return (
        <form>
            <div className={"row"}>
                <div className={"col-4"}>
                    <ul className="list-group" >
                        <li className="list-group-item-borderless" style={{border:"0 0 0 0"}}>
                            <div className={'div-tooltip'} >
                                {errors.selectActivityType && <span className={'span-tooltip'} data-tooltip={errors.selectActivityType.errDesc}/>}
                                <Select
                                    menuPortalTarget={document.querySelector("body")}
                                    value={localData.selectActivityType}
                                    onChange={(e) => handleChangeSelect([e], "selectActivityType")}
                                    options={activeOptions}
                                    getOptionLabel = {(option) => option.LABEL}
                                    getOptionValue = {(option) => option.VALUE}
                                    styles={{...customStyles, ...widthStyles, ...(errors.selectActivityType && errorStyles)}}
                                    isClearable={false}
                                    isSearchable={false}
                                    components={{
                                        DropdownIndicator:() => null,
                                        IndicatorSeparator:() => null,
                                        CrossIcon:() => null,
                                        Placeholder:() => loadingState.selectActivityType ? <>Тип активности...<span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/></> : 'Тип активности'}}
                                    onFocus={() => handleFocus('selectActivityType')}
                                    isDisabled={loadingState.selectActivityType}
                                />
                            {/*<small style={{fontSize: "0.7rem", color: "#dc3545"}}>{errors.selectActivityType && errors.selectActivityType}&nbsp;</small>*/}
                            </div>
                        </li>

                        <li className=" list-group-item-borderless " style={{border:"0 0 0 0"}}>
                            <div className={'div-tooltip'} >
                                {errors.selectSaleChannel && <span className={'span-tooltip'} data-tooltip={errors.selectSaleChannel.errDesc}/>}
                                <Select
                                    menuPortalTarget={document.querySelector("body")}
                                    isMulti
                                    value={localData.selectSaleChannel}
                                    onChange={(e) => handleChangeSelect(e, "selectSaleChannel")}
                                    options={channelOptions}
                                    getOptionLabel = {(option) => option.LABEL}
                                    getOptionValue = {(option) => option.VALUE}
                                    styles={{...customStyles, ...widthStyles, ...(errors.selectSaleChannel && errorStyles)}}
                                    isClearable={false}
                                    isSearchable={false}
                                    components={{
                                        DropdownIndicator:() => null,
                                        IndicatorSeparator:() => null,
                                        CrossIcon:() => null,
                                        Placeholder:() => loadingState.selectSaleChannel ? <>Каналы продаж...<span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/></> : 'Каналы продаж'}}
                                    onFocus={() => handleFocus('selectSaleChannel')}
                                    isDisabled={loadingState.selectSaleChannel}
                                />
                            </div>
                        </li>

                        <li className=" list-group-item-borderless " style={{border:"0 0 0 0"}}>
                            <div className={'div-tooltip'} >
                                {errors.selectCampCode && <span className={'span-tooltip'} data-tooltip={errors.selectCampCode.errDesc}/>}
                                <Select
                                    menuPortalTarget={document.querySelector("body")}
                                    value={localData.selectCampCode}
                                    onChange={(e) => handleChangeSelect([e], "selectCampCode")}
                                    options={campaignOptions}
                                    getOptionLabel = {(option) => option.LABEL}
                                    getOptionValue = {(option) => option.VALUE}
                                    styles={{...customStyles, ...widthStyles, ...(errors.selectCampCode && errorStyles)}}
                                    isClearable={false}
                                    isSearchable={true}
                                    components={{
                                        DropdownIndicator:() => null,
                                        IndicatorSeparator:() => null,
                                        CrossIcon:() => null,
                                        Placeholder:() => loadingState.selectCampCode ? <>Код кампании продаж...<span className={"spinner-border spinner-border-sm"} role={'status'} aria-hidden={'true'}/></> : 'Код кампании продаж'}}
                                    onFocus={() => handleFocus('selectCampCode')}
                                    isDisabled={loadingState.selectCampCode}
                                />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={"col-4"}>
                    {/*<small className="text-muted">Срок актуальности равен дате окончания кампании&nbsp;</small>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    id="rgsReason0"*/}
                    {/*    name={"rgsReason0"}*/}
                    {/*    placeholder="Срок актуальности равен дате окончания кампании"*/}
                    {/*    defaultValue={localData.rgsReason0 || 0}*/}
                    {/*    defaultChecked={localData.rgsReason0 || 0}*/}
                    {/*    onChange={handleChangeCheck}*/}
                    {/*/>*/}

                    <CheckBox title={'Checkbox title'} onChange={handleChangeCheck} name={'mmbReason0'}/>

                    <FloatLabelInput name="mmbName" title={'Срок актуальности повода'} type={'text'} onChange={handleChange}/>

                    <DateTimePicker
                        timeFormat={false}
                        id={"pickerEndDate"}
                        onChange={(moment) => {handleChangeDttm(moment, "DD.MM.YYYY", "pickerEndDate")}}
                        label={"Дата окончания"}
                        name={"pickerEndDate"}
                        value={localData.pickerEndDate}
                        // callbackOnClick={(e) => console.log(e)}
                        // callbackOnChange={(e) => console.log(e)}
                    />

                    <div className="form-label-group">
                        <input
                            type="number"
                            className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
                            name={"rgsReason1"}
                            id="rgsReason1"
                            placeholder="Срок актуальности повода"
                            value={localData.rgsReason1 || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="rgsReason1">Срок актуальности повода</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            type="number"
                            className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
                            name={"rgsReason2"}
                            id="rgsReason2"
                            placeholder="Срок задержки выставления"
                            value={localData.rgsReason2 || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="rgsReason2">Срок задержки выставления</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            type="number"
                            className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
                            name="rgsReason3"
                            id="rgsReason3"
                            placeholder="Срок ожидания с выставления повода"
                            value={localData.rgsReason3 || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="rgsReason3">Срок ожидания с выставления повода</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            type="number"
                            className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
                            name="rgsReason4"
                            id="rgsReason4"
                            placeholder="Срок ожидания с выставления продукта"
                            value={localData.rgsReason4 || ""}
                            onChange={handleChange}
                        />
                        <label htmlFor="rgsReason4">Срок ожидания с выставления продукта</label>
                    </div>
                </div>
            </div>
        </form>
    )
}