import { createContext } from 'react'
import { UploadImageContextProps } from '@src/api/types'

export const UploadImageContext = createContext<UploadImageContextProps | undefined>(undefined)
