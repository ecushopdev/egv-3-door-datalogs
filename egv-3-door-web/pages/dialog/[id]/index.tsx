import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import GetDataLogs from '../../../src/fetch/data/getDataLogs';
import { typeFetchData } from '../../../src/util/type/TypeFetch';

const index = () => {
    const router = useRouter()
    const raceID = router.query.id

    const checkId = async (id: string) => {
        const loadData: string[] = await GetDataLogs().then(data => data)
    }

    useEffect(() => {
        console.log(raceID)
    }, [])
    return (
        <>
            {raceID}
        </>
    )
}

export default index
