import { RefObject } from 'react'

export * from '@src/utils/styles/cn'

export const ripple = (
    e: React.MouseEvent<HTMLButtonElement>,
    btnRef: RefObject<HTMLButtonElement>,
    color: string = 'bg-white/30',
) => {
    const btn = btnRef.current

    if (!btn) return

    const circle = document.createElement('span')
    const diameter = Math.max(btn.clientWidth, btn.clientHeight)
    const radius = diameter / 2
    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${e.clientX - (btn.offsetLeft + radius)}px`
    circle.style.top = `${e.clientY - (btn.offsetTop + radius)}px`

    circle.classList.add('absolute', 'animate-ripple', 'inset-0', 'scale-0', 'rounded-full', color)

    btn.appendChild(circle)

    setTimeout(() => {
        circle.remove()
    }, 3000)
}

export const getColor = async (color: Color, variant: Variant): Promise<string> => {
    const colorClassName =
        color === 'primary' && variant === 'solid' ?
            'bg-primary text-primary-foreground border-primary before:bg-primary hover:before:bg-primary-hover hover:bg-primary-hover hover:border-primary-hover active:before:bg-primary-active active:bg-primary-active active:border-primary-active'
        : color === 'primary' && variant === 'outline' ?
            'bg-transparent text-primary border-primary before:bg-transparent hover:before:bg-primary-hover hover:bg-primary-hover hover:border-primary-hover active:before:bg-primary-active active:bg-primary-active active:border-primary-active hover:text-primary-foreground'
        : color === 'secondary' && variant === 'solid' ?
            'bg-secondary text-secondary-foreground border-secondary before:bg-secondary hover:before:bg-secondary-hover hover:bg-secondary-hover hover:border-secondary-hover active:before:bg-secondary-active active:bg-secondary-active active:border-secondary-active'
        : color === 'secondary' && variant === 'outline' ?
            'bg-transparent text-secondary border-secondary before:bg-transparent hover:before:bg-secondary-hover hover:bg-secondary-hover hover:border-secondary-hover active:before:bg-secondary-active active:bg-secondary-active active:border-secondary-active hover:text-secondary-foreground'
        : color === 'info' && variant === 'solid' ?
            'bg-info text-info-foreground border-info before:bg-info hover:before:bg-info-hover hover:bg-info-hover hover:border-info-hover active:before:bg-info-active active:bg-info-active active:border-info-active'
        : color === 'info' && variant === 'outline' ?
            'bg-transparent text-info border-info before:bg-transparent hover:before:bg-info-hover hover:bg-info-hover hover:border-info-hover active:before:bg-info-active active:bg-info-active active:border-info-active hover:text-info-foreground'
        : color === 'default' && variant === 'solid' ?
            'bg-default text-default-500 border-default before:bg-default hover:before:bg-default-hover hover:bg-default-hover hover:border-default-hover active:before:bg-default-active active:bg-default-active active:border-default-active'
        : color === 'default' && variant === 'outline' ?
            'bg-transparent text-default-500 border-default-500 before:bg-transparent hover:before:bg-default-hover hover:bg-default-hover hover:border-default-hover active:before:bg-default-active active:bg-default-active active:border-default-active hover:text-default-500'
        : color === 'danger' && variant === 'solid' ?
            'bg-danger text-danger-foreground border-danger before:bg-danger hover:before:bg-danger-hover hover:bg-danger-hover hover:border-danger-hover active:before:bg-danger-active active:bg-danger-active active:border-danger-active'
        : color === 'danger' && variant === 'outline' ?
            'bg-transparent text-danger border-danger before:bg-transparent hover:before:bg-danger-hover hover:bg-danger-hover hover:border-danger-hover active:before:bg-danger-active active:bg-danger-active active:border-danger-active hover:text-danger-foreground'
        : color === 'success' && variant === 'solid' ?
            'bg-success text-success-foreground border-success before:bg-success hover:before:bg-success-hover hover:bg-success-hover hover:border-success-hover active:before:bg-success-active active:bg-success-active active:border-success-active'
        : color === 'success' && variant === 'outline' ?
            'bg-transparent text-success border-success before:bg-transparent hover:before:bg-success-hover hover:bg-success-hover hover:border-success-hover active:before:bg-success-active active:bg-success-active active:border-success-active hover:text-primary-foreground'
        : color === 'warning' && variant === 'solid' ?
            'bg-warning text-warning-foreground border-warning before:bg-warning hover:before:bg-warning-hover hover:bg-warning-hover hover:border-warning-hover active:before:bg-warning-active active:bg-warning-active active:border-warning-active'
        : color === 'warning' && variant === 'outline' ?
            'bg-transparent text-warning border-warning before:bg-transparent hover:before:bg-warning-hover hover:bg-warning-hover hover:border-warning-hover active:before:bg-warning-active active:bg-warning-active active:border-warning-active hover:text-warning-foreground'
        :   ''
    return colorClassName
}
