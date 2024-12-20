import { REQ } from '@src/api/axios'

export const getRecordsApi = (endpoint: any, params?: any) => {
    return REQ.get(endpoint, {
        ...params,
    })
}

export const getRecordApi = (endpoint: any) => {
    return REQ.get(endpoint)
}

export const createRecordApi = (endpoint: any, data: any) => {
    return REQ.post(endpoint, data)
}

export const updateRecordApi = (endpoint: any, data: any) => {
    return REQ.put(endpoint, {
        ...data,
    })
}

export const deleteRecordApi = (endpoint: any) => {
    return REQ.destory(endpoint)
}
