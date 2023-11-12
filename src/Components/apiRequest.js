const apiRequest = async (url = '', optionsObject = {}, erMsg = null) => {
    try {
        const response = await fetch(url, optionsObject);
        if (!response.ok) throw Error('Please reload the page');
    } catch (err) {
        erMsg = err.message;
    } finally {
        return erMsg;
    }
}

export default apiRequest