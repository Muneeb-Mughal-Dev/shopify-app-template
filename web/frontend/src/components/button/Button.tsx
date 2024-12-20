import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import loading from '@src/assets/icons/spinning-circles.svg'
import type { ButtonProps, ButtonStyleProps, ButtonStyles } from '@src/components/button'
import { buttonStyles } from '@src/components/button'
import { Image } from '@src/components/image'
import { cn, ripple as rippleEffect } from '@src/utils/styles'
import { Icon } from '../icon'

export const Button = <T extends ElementType = 'button'>({
    as,
    icon,
    onClick,
    children,
    className,
    rippleColor,
    type = 'button',
    disabled = false,
    isLoading = false,
    iconPlacement = 'start',
    ...rest
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
    const Component = as || 'button'
    const id = useId()
    const btnRef = useRef<HTMLButtonElement>(null)
    const [styles, setStyles] = useState<ButtonStyles | null>(null)

    useEffect(() => {
        const fetchStyles = async () => {
            const buttonStyleProps = { ...rest }
            const computedStyles = await buttonStyles(buttonStyleProps as unknown as ButtonStyleProps)
            setStyles(computedStyles)
        }

        fetchStyles()
    }, [type])

    const combinedClassNames = `${styles?.base} ${styles?.size} ${styles?.color} ${styles?.rounded} ${styles?.shadow} ${styles?.fullWidth} ${className}`

    const rippleClr = rippleColor ? rippleColor : 'bg-white/30'

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        rippleEffect(e, btnRef, rippleClr)
        if (onClick) {
            onClick(e)
        }
    }

    return (
        <Component
            id={`button-${id}`}
            ref={Component === 'button' ? btnRef : undefined}
            disabled={disabled}
            onClick={handleClick}
            type={Component === 'button' ? type : undefined}
            {...rest}
            className={cn(combinedClassNames, className)}
        >
            {icon && iconPlacement === 'start' && <Icon name={icon} size={14} />}
            {isLoading && iconPlacement === 'start' && <Image src={loading} alt='loading...' className='w-4' />}
            {children}
            {icon && iconPlacement === 'end' && <Icon name={icon} size={14} />}
            {isLoading && iconPlacement === 'end' && <Image src={loading} alt='loading...' className='w-4' />}
        </Component>
    )
}
