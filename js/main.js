function query(url, method = 'GET', data = []) {
    let query;
    switch (method) {
        case 'GET':
        default:
            query = fetch(url);
        break;

        case 'POST':
            query = fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
        break;
    }

    return query.then(result => result.json());
}

const categories = query('https://638753ede399d2e473fbc7fa.mockapi.io/avi/v1/categories').then(json => {
    console.log(json)
})