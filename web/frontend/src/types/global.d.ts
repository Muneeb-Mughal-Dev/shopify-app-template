declare type PageModule = {
    default: React.ComponentType
}

declare type Pages = {
    [key: string]: PageModule
}

declare interface Route {
    element: ComponentType
    layout?: string
    path: string
    children?: Route[]
}

declare interface GroupRoute {
    path?: string
    children?: Route[]
    element: ComponentType
}

declare interface GroupLayoutRoute {
    children: GroupRoute[]
    element: ComponentType | null
}

declare type PageModule = {
    default: React.ComponentType
}

declare type Pages = {
    [key: string]: PageModule
}

declare interface Route {
    element: ComponentType
    layout?: string
    path: string
    children?: Route[]
}

declare type Variant = 'solid' | 'outline'
declare type ClassName = string
declare type Color = 'primary' | 'secondary' | 'default' | 'success' | 'info' | 'warning' | 'danger'

declare interface Children {
    children: ReactNode
}
declare interface ChildrenWithElement extends Children {
    as?: ElementType
}

declare type Theme = 'light' | 'dark'

declare type InputChangeEvent = ChangeEvent<HTMLInputElement>

declare type ErrorType = {
    name: string | null
    state: boolean
    message: string | null
}

declare type ToastProps = {
    message: string
    type: 'success' | 'warning' | 'error'
    state: boolean
}