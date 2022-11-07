/**
 * @param {AxiosInstance} axios 
 * @param {Number} MAX_CONCURRENT 
 * @returns {{ axios: AxiosInstance, detach: Function }}
 */
const axiosQ = (axios, MAX_CONCURRENT = 1) => {
    if (MAX_CONCURRENT < 1)
        throw 'The minimum number of concurrent requests is 1';
    const instance = {
        requestQueue: [],
        taskQueue: [],
        interceptors: {
            request: null,
            response: null
        },
        shiftInitial: () => {
            setTimeout(() => {
                if (instance.taskQueue.length < MAX_CONCURRENT) {
                    instance.shift();
                }
            }, 0);
        },
        push: reqHandler => {
            instance.requestQueue.push(reqHandler);
            instance.shiftInitial();
        },
        shift: () => {
            if (instance.requestQueue.length) {
                const queued = instance.requestQueue.shift();
                queued.resolver(queued.request);
                instance.taskQueue.push(queued);
            }
        },
        requestHandler: req => {
            return new Promise(resolve => {
                instance.push({ request: req, resolver: resolve });
            });
        },
        responseHandler: res => {
            instance.taskQueue.shift();
            instance.shift();
            return res;
        },
        responseErrorHandler: res => {
            return Promise.reject(instance.responseHandler(res));
        }
    };
    instance.interceptors.request = axios.interceptors.request.use(
        instance.requestHandler
    );
    instance.interceptors.response = axios.interceptors.response.use(
        instance.responseHandler,
        instance.responseErrorHandler,
    );
    return {
        axios,
        detach: () => {
            axios.interceptors.request.eject(instance.interceptors.request);
            axios.interceptors.response.eject(instance.interceptors.response);
        }
    };
};

module.exports = {
    axiosQ
};