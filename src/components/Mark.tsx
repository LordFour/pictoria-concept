/**
 * Pictoria's tree-in-a-circle mark, cut from the original logo file (raster, alpha mask)
 * and tinted with CSS so it can take any brand colour. Vector source to be requested.
 */
export function Mark({ className = '', color = 'var(--color-turquoise)', label }: { className?: string; color?: string; label?: string }) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block aspect-square ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${import.meta.env.BASE_URL}brand/pictoria-mark.png)`,
        maskImage: `url(${import.meta.env.BASE_URL}brand/pictoria-mark.png)`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}
