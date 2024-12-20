import { ReactNode } from 'react'

export type ProviderProps = {
    children: ReactNode
}

export interface FileType {
    [key: string]: {
        name: string
        size: number
        url: string
    }
}

export interface UploadImageContextProps {
    files: FileType
    setFiles: React.Dispatch<React.SetStateAction<FileType>>
    uploadImage: (data: any, file: File) => Promise<void>
    deleteImage: (data: any) => Promise<void>
    uploadToDb: (url: any) => Promise<void>
}
