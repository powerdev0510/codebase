import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useMutation, useQuery } from 'react-query'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

import InputImage from '~components/ui/InputImage'
import InputWithLabel from '~components/ui/InputWithLabel'
import ModalWrapper from '~components/ui/ModalWrapper'
import * as style from './ModalMint.module.scss'
import { maskNumberValue } from '~utils'
import InputSelect from '~components/ui/InputSelect'
import { ApiKey, getCategoriesList, mintNFT } from '~utils/api'
import { ALL_SUPPORTED_CHAIN_OPTIONS } from '~utils/enums'
import OverlayContext from '~contexts/OverlayContext'

type FormValues = {
  title: string
  description: string
  price: string
  chain: {
    label: string
    value: string
  }
  category: {
    label: string
    value: string
  }
  media: File[]
}

type ModalMintProps = {
  className?: string
  isVisible: boolean
  onHide: () => void
  [otherProps: string]: any
}

const ModalMint = (props: ModalMintProps) => {
  const { className, isVisible, onHide, ...rest } = props

  const { library }: { library?: ethers.providers.Web3Provider } =
    useWeb3React()

  const methods = useForm<FormValues>()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods

  const [isMinting, setIsMinting] = useState(false)

  const { addToastToStack } = useContext(OverlayContext)

  const { data: categoriesData } = useQuery(
    ApiKey.CATEGORY_LIST,
    getCategoriesList,
    { enabled: isVisible }
  )

  // Step 2: Mint with MetaMask
  const mintWithMetamask = (data: any) => {
    if (!library) return

    library
      .getSigner()
      .sendTransaction(data)
      .then(() => {
        addToastToStack({ type: 'mintSuccess' })
        onHide()
      })
      .catch((e: any) => {
        addToastToStack({ type: 'mintError', text: e?.message })
      })
      .finally(() => setIsMinting(false))
  }

  const mintMutation = useMutation(mintNFT, {
    onSuccess: (data) => mintWithMetamask(data),
    onError: (e) => {
      console.log(e)
      setIsMinting(false)
      addToastToStack({ type: 'mintError', text: e })
    },
  })

  // Step 1: Get the transaction data from the API
  const onSubmit = async (values: FormValues) => {
    setIsMinting(true)

    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('chain', values.chain.value)
    formData.append('category', values.category.value)
    formData.append('price', values.price)
    formData.append('media', values.media[0])

    mintMutation.mutate(formData)
  }

  return (
    <ModalWrapper
      title="Mint your NFT"
      {...rest}
      className={className}
      show={isVisible}
      backdrop="static"
      onHide={onHide}
      isLoading={isMinting}
      loadingText="Minting"
    >
      <FormProvider {...methods}>
        <Modal.Body
          as="form"
          id="form-personal-info"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.gridInputs}>
            <InputWithLabel
              id="inp-nft-title"
              label="Your title"
              placeholder="Enter your NFT title"
              {...register('title', {
                required: 'Please, specify your NFT title',
              })}
              errors={errors}
              autoComplete="off"
            />
            <InputWithLabel
              id="inp-description"
              label="Description"
              placeholder="Enter your NFT description"
              errors={errors}
              as="textarea"
              variant="textarea"
              rows="4"
              maxlength="280"
              {...register('description', {
                required: 'Please, specify your NFT description',
              })}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: 'Please, specify the price',
                min: {
                  value: 0.000000000000000001,
                  message: 'The price is too small',
                },
              }}
              // @ts-ignore
              render={({ field: { onChange, ...fieldProps } }) => (
                <InputWithLabel
                  {...fieldProps}
                  id="inp-nft-price"
                  label="Price"
                  placeholder="Enter price in Pixels"
                  errors={errors}
                  onChange={(e: any) =>
                    onChange(maskNumberValue(e.target.value))
                  }
                  autoComplete="off"
                />
              )}
            />
            <InputSelect
              id="inp-nft-chain"
              label="Chain"
              options={ALL_SUPPORTED_CHAIN_OPTIONS}
              placeholder="Select chain"
              name="chain"
              msgRequired="Please, specify the NFT chain"
              errors={errors}
              required
            />
            <InputSelect
              id="inp-nft-category"
              label="Category"
              options={categoriesData}
              name="category"
              msgRequired="Please, specify the NFT category"
              errors={errors}
              required
            />
            <InputImage
              label="Media"
              id="inp-nft-media"
              name="media"
              text="Drag & drop an image here, or click to browse"
              hint="8000x8000px. JPG or PNG. 100MB max size."
              dropzoneOptions={{
                accept: 'image/jpeg, image/png',
                maxSize: 100 * 1000 * 1000, // 100MB
                maxFiles: 1,
                multiple: false,
              }}
              msgFileType="Please, submit a jpg or png file"
              errors={errors}
              required="Please, submit an image for minting"
            />
          </div>
        </Modal.Body>
      </FormProvider>
      <Modal.Footer>
        <Button
          form="form-personal-info"
          type="submit"
          variant="outline-success"
          className={style.btnRegister}
          size="lg"
        >
          Mint
        </Button>
      </Modal.Footer>
      <DevTool control={control} />
    </ModalWrapper>
  )
}

export default ModalMint
