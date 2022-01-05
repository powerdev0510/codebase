import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormLabel, FormText } from 'react-bootstrap'
import prettyBytes from 'pretty-bytes'
import { useFormContext } from 'react-hook-form'

import * as style from './InputImage.module.scss'
import Dropzone from '~components/ui/Dropzone'

/**
 * InputImage component
 */
const InputImage = (props) => {
  const {
    className,
    imgData: imgDataProp,
    label,
    text,
    hint,
    name,
    id,
    dropzoneOptions,
    errors,
    msgFileType,
    msgFileSize,
    required,
    ...rest
  } = props

  const { maxSize } = dropzoneOptions

  const imgRef = useRef()

  const [imgData, setImgData] = useState()

  useEffect(() => setImgData(imgDataProp), [imgDataProp?.id])

  const { register, unregister, setValue, setError, clearErrors } =
    useFormContext()

  // eslint-disable-next-line no-unused-vars
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles?.length) return

      clearErrors()
      setValue(name, acceptedFiles)

      const file = acceptedFiles[0]
      if (!file) return
      setImgData({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      })
    },
    [setValue, setImgData, name]
  )

  const handleDropRejected = useCallback(
    (files) => {
      const { message, code } = files?.[0]?.errors?.[0] ?? {}

      switch (code) {
        case 'file-too-large':
          setError(name, {
            type: code,
            message:
              msgFileSize ??
              `The file size should be under ${prettyBytes(maxSize)}`,
          })
          break
        case 'file-invalid-type':
          setError(name, {
            type: code,
            message: msgFileType ?? message,
          })
          break
        default:
          setError(name, {
            type: code,
            message,
          })
      }
    },
    [setError, maxSize, name, msgFileType, msgFileSize]
  )

  const onDelete = useCallback(() => {
    setImgData(null)
    setValue(name, undefined)
  }, [setImgData, setValue])

  useEffect(() => {
    register(name, { required: required || false })
    return () => unregister(name)
  }, [register, unregister, name, required])

  return (
    <div {...rest} className={classNames(className)}>
      {!!label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {imgData ? (
        <div className={style.imageSelectedField}>
          <a
            href={imgData?.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              src={imgData?.url}
              alt={label}
              className={style.imgPreview}
              ref={imgRef}
            />
          </a>
          <div className={style.colImgInfo}>
            <p className={style.textInfo}>
              <span>{imgData?.name}</span>{' '}
              <span className={style.textSize}>
                ({prettyBytes(imgData?.size)})
              </span>
            </p>
            <button
              className={style.btnDelete}
              type="button"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Dropzone
          onDrop={onDrop}
          text={text}
          hint={hint}
          name={name}
          id={id}
          onDropRejected={handleDropRejected}
          dropzoneOptions={dropzoneOptions}
        />
      )}
      {!!errors?.[name] && (
        <FormText className="form-text--error">
          {errors?.[name].message}
        </FormText>
      )}
    </div>
  )
}

InputImage.defaultProps = {
  className: '',
  label: '',
  imgData: null,
  msgFileType: null,
  msgFileSize: null,
  errors: {},
  required: false,
}

InputImage.propTypes = {
  className: PropTypes.string,
  imgData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }),
  text: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  dropzoneOptions: PropTypes.object.isRequired,
  errors: PropTypes.object,
  msgFileType: PropTypes.string,
  msgFileSize: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default InputImage
