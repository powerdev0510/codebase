export type User = {
  name: string
  profileUrl: string
  coverImg?: string
  profileImg: string
  isVerified?: boolean
  role?: string
  [otherProps: string]: any
}

export type Category = {
  title: string
  value: string
  gradient: string
  quantity?: number
}

export type Collection = {
  id: number
  name: string
  imgSrc: string
  relatedUsers?: User[]
}

export type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
      domain: string
    }
  }
}

export type Creator = {
  id: number
  name: string
  username: string
  imgSrc: string
  profileUrl: string
  role: string
  followers: number
  isVerified: boolean
  isFollowing: boolean
  collection: Collection
}

type ToastAction = 'register' | 'mint' | 'purchase' | 'approve'
type ToastStatus = 'Success' | 'Error'

export type Toast = {
  type: `${ToastAction}${ToastStatus}`
  text?: string
}
