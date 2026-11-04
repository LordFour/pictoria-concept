import type { ImgHTMLAttributes } from 'react'
import { src, srcSet, type Pic } from '../data/images'
import { useLang } from '../i18n/lang'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  pic: Pic
  /** Layout width hint for the browser, e.g. "(min-width: 768px) 40vw, 90vw" */
  sizes?: string
  priority?: boolean
  /** Decorative duplicates get an empty alt */
  decorative?: boolean
}

/** Responsive, lazy, CLS-safe image for Pictoria's own photographs. */
export function Img({ pic, sizes = '(min-width: 768px) 50vw, 100vw', priority, decorative, className, ...rest }: Props) {
  const { l } = useLang()
  return (
    <img
      src={src(pic)}
      srcSet={srcSet(pic)}
      sizes={sizes}
      width={pic.w}
      height={pic.h}
      alt={decorative ? '' : l(pic.alt)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      {...rest}
    />
  )
}
