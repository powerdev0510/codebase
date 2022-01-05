import React from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

// @ts-ignore
import * as style from './BtnIcon.module.scss'
import Icon from '~components/ui/Icon'

type BtnIconProps = {
  className?: string
  variant?: string
  iconName: string
  title: string
  size?: number | [number, number]
  viewbox?: number | [number, number]
  isAdaptive?: boolean
  [otherProps: string]: any
}

const BtnIcon = (props: BtnIconProps) => {
  const {
    className,
    variant = 'outline-success',
    iconName,
    title,
    size = 24,
    viewbox,
    isAdaptive = false,
    ...rest
  } = props

  return (
    <Button
      {...rest}
      variant={variant}
      className={classNames(
        style.btnIcon,
        { [style.isAdaptive]: isAdaptive },
        'btn-adaptive-sm',
        className
      )}
      title={title}
      aria-label={title}
    >
      <Icon
        name={iconName}
        size={size}
        viewbox={viewbox}
        className={style.icon}
      />
    </Button>
  )
}

export default BtnIcon
