import axios from 'axios'
import https from 'https';


export const httpClient = axios.create({
    baseURL: process.env.BASE_URL,
    // insecureHTTPParser: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

httpClient.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        return Promise.reject(error.message)
    }
)
