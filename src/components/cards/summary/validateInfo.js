import validateProcess from "../process/validateProcess"
import fileValidateInfo from "../selectFile/fileValidateInfo"

export default function validateInfo(values) {
    return {
        ...validateProcess(values),
        ...fileValidateInfo(values)
    }
}