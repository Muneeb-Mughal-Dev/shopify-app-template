import { ElementType, MouseEventHandler, ReactNode } from 'react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type As = ElementType
export type Disabled = boolean
export type ClassName = string
export type IsLoading = boolean
export type Spinner = ReactNode
export type FullWidth = boolean
export type rippleColor = string
export type DisableRipple = boolean
export type Type = 'button' | 'submit'
export type IconPlacement = 'start' | 'end'
export type Icon = keyof typeof dynamicIconImports
export type Shadow = 'sm' | 'md' | 'lg' | 'none'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type OnClickEvent = MouseEventHandler<HTMLButtonElement>
export type Rounded = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none'

export interface ButtonStyles {
    base: string
    color: string
    size: string
    rounded: string
    shadow: string
    fullWidth: string
}

export interface ButtonProps<T extends ElementType> {
    as?: T
    icon?: Icon
    size?: Size
    type?: Type
    color?: Color
    shadow?: Shadow
    rounded?: Rounded
    variant?: Variant
    children: ReactNode
    disabled?: Disabled
    fullWidth?: FullWidth
    className?: ClassName
    isLoading?: IsLoading
    onClick?: OnClickEvent
    rippleColor?: rippleColor
    disableRipple?: DisableRipple
    iconPlacement?: IconPlacement
}
export interface ButtonStyleProps {
    children: ReactNode
    size?: Size
    color?: Color
    rounded?: Rounded
    shadow?: Shadow
    type?: Type
    fullWidth?: FullWidth
    disabled?: Disabled
    variant?: Variant
    disableRipple?: DisableRipple
    rippleColor?: rippleColor
    onClick?: OnClickEvent
    iconPlacement?: IconPlacement
    isLoading?: IsLoading
    className?: ClassName
}
