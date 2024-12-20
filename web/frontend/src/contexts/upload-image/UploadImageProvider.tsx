import { useState } from 'react'
import { createRecordApi, deleteRecordApi } from '@src/api/endpoints'
import { FileType, ProviderProps } from '@src/api/types'
import { Env } from '@src/constants/environments'
import { UploadImageContext } from '@src/contexts/upload-image/UploadImageContext'

export const UploadImageProvider = ({ children }: ProviderProps) => {
    const [files, setFiles] = useState<FileType>({})

    //upload file to bucket
    const uploadImage = async (data: any, file: File) => {
        await createRecordApi('/upload', data)
            .then((res: any) => {
                const uploadedUrl = `${Env.bucketUrl}${res?.data}`
                setFiles((prevFiles) => ({
                    ...prevFiles,
                    [uploadedUrl]: { name: file.name, size: file.size, url: uploadedUrl },
                }))
            })
            .catch((e) => {
                console.error('error:', e)
            })
    }

    //delete uploaded image
    const deleteImage = async (fileName: string) => {
        await deleteRecordApi(`/delete/uploads?directory=${Env.directory}&fileName=${fileName}`)
            .then((res: any) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    //save file to db
    const uploadToDb = async (data: any) => {
        console.log('upload data==>', data)
        try {
            const res = await fetch('/api/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <UploadImageContext.Provider value={{ uploadImage, deleteImage, uploadToDb, setFiles, files }}>
            {children}
        </UploadImageContext.Provider>
    )
}
