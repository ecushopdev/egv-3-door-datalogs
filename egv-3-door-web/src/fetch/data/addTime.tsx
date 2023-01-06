import { httpClient } from '../../services/httpClient';
import { typeTimeSettings } from '../../util/type/TypeFormTime';
import { APIAddTime } from '../../util/url/urlFetch';
import { Code } from '../../util/code';

const AddTimeRace = async (props: typeTimeSettings) => {
    let data: any = null
    return await httpClient.post(APIAddTime, props).then(res => {
        data = res.data
        const code = data.code
        const message = data.message
        return [code, message]
    }).catch(e => {
        return [Code.error, "Internal Server Error"]
    })
};

export default AddTimeRace;