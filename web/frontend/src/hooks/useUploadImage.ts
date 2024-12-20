import { useContext } from 'react'
import { UploadImageContext } from '@src/contexts/upload-image/UploadImageContext'

export const useUploadImage = () => {
    const context = useContext(UploadImageContext)

    if (!context) throw new Error('Expected to be wrapped in a UploadImage Provider')

    return context
}
