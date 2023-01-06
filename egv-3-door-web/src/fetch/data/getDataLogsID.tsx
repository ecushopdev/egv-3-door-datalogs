import React from 'react';
import { httpClient } from '../../services/httpClient';
import { APIGetDataLogsById } from '../../util/url/urlFetch';

const GetDataLogsID = async (id: string) => {
    let data: any = null
    const url = APIGetDataLogsById(id)
    return await httpClient.get(url).then((res: any) => {
        data = res.data
        return data
    })
};

export default GetDataLogsID;