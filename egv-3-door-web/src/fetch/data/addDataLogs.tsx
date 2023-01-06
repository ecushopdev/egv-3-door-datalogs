import { httpClient } from '../../services/httpClient';
import { APIAddTime, APIDummyAddDataLog } from '../../util/url/urlFetch';
import { Code } from '../../util/code';
import { typeDataLogDto } from '../../util/type/TypeDataLog';

const AddDataLogs = async (id: string, props: typeDataLogDto[]) => {
    let data: any = null
    const url = APIDummyAddDataLog(id)
    return await httpClient.post(url, props).then(res => {
        data = res.data
        const code = data.code
        const message = data.message
        return [code, message]
    }).catch(e => {
        return [Code.error, "Internal Server Error"]
    })
};

export default AddDataLogs;