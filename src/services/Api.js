import apisauce from 'apisauce'

const create = (baseURL = '') => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        timeout: 10000
    });

    return {
        ...api
    }
};

export default {
    create
}
