const fs = require('fs')
const pathModule = require('path')

module.exports = (path, fileName, callbackFileSaved) => {
    const validTypes = ['.jpg', '.png', '.jpeg']
    const fileType = pathModule.extname(path)
    const isValidType = validTypes.includes(fileType)
    if (isValidType) {
        const filePath = `./assets/${fileName}${fileType}`
        fs.createReadStream(path)
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => callbackFileSaved(false, filePath))
    } else {
        const error = 'File type is invalid.'
        callbackFileSaved(error)
    }
}