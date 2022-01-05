import React, { forwardRef } from 'react'
import { Button } from 'react-bootstrap'
import cn from 'classnames'

import Icon from '~components/ui/Icon'

export type DropdownToggleType = {
  className?: string
  iconName?: string
  iconSize?: number | [number, number]
  variant?: string
}

const DropdownToggle = forwardRef(
  (
    {
      className = '',
      iconName = 'icon-three-dots',
      iconSize = 16,
      variant,
      ...rest
    }: DropdownToggleType,
    ref
  ) => {
    return (
      <Button
        {...rest}
        variant={variant}
        className={cn({ [className]: className })}
        // @ts-ignore
        ref={ref}
      >
        <Icon name={iconName} size={iconSize} />
      </Button>
    )
  }
)

export default DropdownToggle
