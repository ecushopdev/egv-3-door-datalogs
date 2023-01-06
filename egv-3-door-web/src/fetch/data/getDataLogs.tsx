import React from 'react';
import { httpClient } from '../../services/httpClient';
import { APIGetDataLogs } from '../../util/url/urlFetch';

const GetDataLogs = async () => {
    let data: any = null
    return await httpClient.get(APIGetDataLogs).then((res: any) => {
        data = res.data
        return data
    })
};

export default GetDataLogs;