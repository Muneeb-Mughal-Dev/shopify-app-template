import { ClassName } from '../button'

export type Src = string
export type Alt = string
export type Width = number
export type Height = number
export type Loading = 'lazy' | 'eager'

export interface ImageProps {
    src: Src
    alt?: Alt
    className?: ClassName
    loading?: Loading
    width?: Width
    height?: Height
}
