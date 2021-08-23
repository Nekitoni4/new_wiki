
function bytesToKb(bytes) {
    return Math.floor(bytes/1024);
}

function countWordsInContent(text) {
    return text.split(' ').length;
}

export {countWordsInContent, bytesToKb};
