const splitStr = (str) => {
    const splitLength = 20;
    if (str && str.length > splitLength) {
        let result = '';

        const size = Math.ceil(str.length / splitLength);

        for (let i = 0; i < size; i++) {
            const fragmentStr = `${str.slice(i * splitLength, (i + 1) * splitLength)}`;
            if (i === size - 1) {
                result = result.concat(`${fragmentStr}`);
            } else {
                result = result.concat(`${fragmentStr}<br>`);
            }
        }
        return result;
    }

    return str;
}

module.exports = splitStr;