/* eslint-disable react/prop-types */
import React from 'react'
import { API_ROOT_URL } from '~utils/constants'
import { ApiKey } from '~utils/api'

interface PictureProps extends React.ComponentPropsWithoutRef<'img'> {
  alt: string
  src: string
  pixelRatios?: number[]
  maxWidth?: number
  [otherProps: string]: any
}

const Picture = React.forwardRef<HTMLImageElement, PictureProps>(
  (props, ref) => {
    const {
      src,
      alt,
      pixelRatios = [1, 2],
      maxWidth,
      maxHeight,
      ...rest
    } = props

    const endpointUrl = `${API_ROOT_URL}/${ApiKey.IMAGE}`

    const srcSet =
      pixelRatios?.length && (maxWidth || maxHeight)
        ? pixelRatios
            .map((pixelRatio) => {
              const url = new URL(endpointUrl)

              url.searchParams.set('url', src)
              if (maxWidth) {
                url.searchParams.set(
                  'width',
                  (maxWidth * pixelRatio).toString()
                )
              }
              if (maxHeight) {
                url.searchParams.set(
                  'height',
                  (maxHeight * pixelRatio).toString()
                )
              }

              return `${url.toString()} ${pixelRatio}x`
            })
            .join(', ')
        : ''

    const url = new URL(endpointUrl)
    url.searchParams.set('url', src)
    if (maxWidth) {
      url.searchParams.set('width', maxWidth.toString())
    }
    if (maxHeight) {
      url.searchParams.set('height', maxHeight.toString())
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <img
        ref={ref}
        alt={alt}
        src={maxWidth ? url.toString() : src}
        srcSet={srcSet}
        {...rest}
      />
    )
  }
)

export default Picture
