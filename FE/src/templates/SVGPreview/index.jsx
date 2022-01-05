import React from 'react'
import SVGSprite from '~components/general/SVGSprite'

import * as style from './SVGPreview.module.scss'
import S from '~components/seo'

/**
 * SVGPreview component
 */
const SVGPreview = () => {
  return (
    <div className={style.svgPreview}>
      <S title="SVG Preview" />
      <SVGSprite className={style.table} variant="sl" />
    </div>
  )
}

export default SVGPreview
