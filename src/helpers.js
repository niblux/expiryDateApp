const makeRequest = (url = '', methodType, data = {}) => {
    return fetch(url, {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
        .then(response => response.json()); // parses response to JSON
}

module.exports = makeRequest;