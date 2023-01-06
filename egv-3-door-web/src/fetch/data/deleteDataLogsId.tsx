import React from 'react';
import { httpClient } from '../../services/httpClient';
import { APIGetDataLogsById } from '../../util/url/urlFetch';
import { Code } from '../../util/code';

const deleteDataLogsID = async (id: string) => {
    let data: any = null
    const url = APIGetDataLogsById(id)
    return await httpClient.delete(url).then((res: any) => {
        data = res.data
        return data
    }).catch((error: any) => {
        // return { code: 404, error: error.message }
        return [Code.notFound, "Not Found Delete ID"]
    })
};


export default deleteDataLogsID;