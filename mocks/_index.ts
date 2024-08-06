module.exports = (fileName) => {
    try {
        return require(`./${fileName}.json`)
    } catch (error) {
        return `${error}`;
    }
}