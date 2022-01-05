import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'

import * as style from './Dropzone.module.scss'

/**
 * Dropzone component
 */
const Dropzone = (props) => {
  const {
    className,
    onDrop,
    text,
    hint,
    name,
    id,
    dropzoneOptions,
    onDropRejected,
    ...rest
  } = props

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropzoneOptions,
    onDrop,
    onDropRejected,
  })

  return (
    <div
      {...rest}
      {...getRootProps()}
      className={classNames(
        style.dropzone,
        { [style.dragActive]: isDragActive },
        className
      )}
    >
      <input {...getInputProps()} id={id} />
      {isDragActive ? (
        <p className={style.textMain}>Drop the image here ...</p>
      ) : (
        <>
          <p className={style.textMain}>{text}</p>
          <p className={style.textSub}>{hint}</p>
        </>
      )}
    </div>
  )
}

Dropzone.defaultProps = {
  className: '',
}

Dropzone.propTypes = {
  className: PropTypes.string,
  onDrop: PropTypes.func.isRequired,
  onDropRejected: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dropzoneOptions: PropTypes.object.isRequired,
}

export default Dropzone
