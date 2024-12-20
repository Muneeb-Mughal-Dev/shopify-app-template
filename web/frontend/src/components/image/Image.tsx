import { useId } from 'react'
import { ImageProps } from '@src/components/image'
import { cn } from '@src/utils/styles'

export const Image: React.FC<ImageProps> = ({ src, alt, className, loading = 'lazy', width, height }) => {
    const id = useId()

    return (
        <img
            id={id}
            src={src}
            width={width}
            height={height}
            loading={loading}
            alt={alt || 'brand-name'}
            className={cn('h-full w-full object-cover', className)}
        />
    )
}
