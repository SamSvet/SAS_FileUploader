import React from "react"
import {DateTimePicker} from "../../../DateTimePicker"

export const ExtListParameters = () => (
    <>
        <small className="text-muted">Срок актуальности равен дате окончания кампании&nbsp;</small>
        <input
            type="checkbox"
            placeholder="Срок актуальности равен дате окончания кампании"
        />

        <DateTimePicker
            timeFormat={false}
            id={"mmbPickerEndDate"}
            label={"Дата окончания"}
            name={"mmbPickerEndDate"}
        />

        <div className="form-label-group">
            <input
                type="number"
                className="form-control-plaintext border-dark border-left-0 border-right-0 border-top-0"
                name={"mmbReason1"}
                id="mmbReason1"
                placeholder="Срок актуальности повода"
            />
            <label htmlFor="mmbReason1">Срок актуальности повода</label>
        </div>
    </>
)