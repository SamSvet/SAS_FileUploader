import extListValidate from "../process/ExtList/extListValidate"
import fileValidateInfo from "../selectFile/fileValidateInfo"
import mmbValidate from "../process/MMB/mmbValidate"

export default function validateInfo(values) {
    return {
        ...extListValidate(values),
        ...mmbValidate(values),
        ...fileValidateInfo(values)
    }
}