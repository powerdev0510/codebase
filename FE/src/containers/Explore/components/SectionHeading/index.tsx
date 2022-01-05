import React from 'react'
import classNames from 'classnames'

// @ts-ignore
import * as style from '../../ExplorePage.module.scss'

type SectionHeadingProps = {
  className?: string
  text: string
  extraComponent?: React.ReactNode
  [otherProps: string]: any
}

const SectionHeading = (props: SectionHeadingProps) => {
  const { className, text, extraComponent, ...rest } = props

  return (
    <div {...rest} className={classNames(style.headingWrapper, className)}>
      <h2 className={style.heading}>{text}</h2>
      {extraComponent}
    </div>
  )
}

SectionHeading.defaultProps = {
  className: '',
}

export default SectionHeading
