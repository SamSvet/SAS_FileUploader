export default function fileValidateInfo(values) {
    if (!("fileInput" in values)){
        return {fileInput: {errDesc:"You should select a file"}}
    }
    return {}
}