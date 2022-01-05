import dayjs from 'dayjs'

import { Creator } from '~interfaces'
import {
  AuctionHistoryItemType,
  TransactionStatus,
  TransactionType,
} from '~utils/enums'

const MOCK_LIVE_AUCTIONS = [
  {
    id: 1,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(3988, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        isVerified: true,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 2,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 3,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 4,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 5,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 6,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 7,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 8,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    status: 'live',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
]

const MOCK_COLLECTIONS = [
  {
    id: 1,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        isVerified: true,
        role: 'owner',
      },
    ],
  },
  {
    id: 2,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 3,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 4,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 5,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 6,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 7,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
  {
    id: 8,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'owner',
      },
    ],
  },
]

const MOCK_AUCTIONS_EXPLORE = [
  {
    id: 1,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'art',
    status: 'live',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(3988, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      isVerified: true,
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 2,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'complete',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 3,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'completed',
    state: 'created',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 4,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'created',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 5,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'sold',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 6,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'sold',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 7,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'bidding',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 8,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'bidding',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 9,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'collectibles',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(3988, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      isVerified: true,
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 10,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'collectibles',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 11,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 12,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 13,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 14,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'onSale',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
  {
    id: 15,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    price: 2.1,
    currency: 'PIXEL',
    category: 'photography',
    status: 'live',
    state: 'created',
    imgSrc:
      'https://pixelnft.mypinata.cloud/ipfs/QmSt3RjvRKHHVLLpXKnJYTnb17okRYqbKAuzaZi3dwR8Ry',
    countdownTimestamp: dayjs().add(18659, 's').unix(),
    owner: {
      name: 'michaelmicha',
      profileImg:
        'https://pixelnft.mypinata.cloud/ipfs/QmcF3ocFbnA4otnftkMyw8qpVmRfxnoSh183iVnW7KWNoK',
      profileUrl: '/',
      role: 'owner',
    },
  },
]

const MOCK_AUCTION_DETAILS_ITEM = {
  id: 228,
  name: 'Weak-Key Distinguishers for AES Bubbles',
  imgSrc: `https://picsum.photos/1000/1000?nocache=${Math.random()}`,
  // bid: {
  //   price: 12.4627,
  //   currencyName: 'PIXEL',
  //   priceUsd: '1,204.4729',
  // },
  purchase: {
    price: 15.2642,
    currencyName: 'PIXEL',
    priceUsd: '1,583.9263',
  },
  percentOfSalesToCreator: 15,
  status: 'live',
  // timestamp: dayjs().add(16, 'h').add(40, 'm').add(12, 's').unix(),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo tellus pretium consectetur morbi diam nullam eu. Sed volutpat pharetra consectetur scelerisque viverra gravida magna enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo tellus pretium consectetur morbi diam nullam eu. Sed volutpat pharetra consectetur scelerisque viverra gravida magna enim.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo tellus pretium consectetur morbi diam nullam eu. Sed volutpat pharetra consectetur scelerisque viverra gravida magna enim.',
  owners: [
    {
      name: 'Mario Choo',
      profileUrl: '/',
      profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
      role: 'owner',
    },
  ],
  creators: [
    {
      name: 'Michael Pink',
      profileUrl: '/',
      profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
      role: 'creator',
    },
  ],
  collection: {
    id: 1,
    name: 'Weak-Key Distinguishers for AES Bubbles',
    imgSrc: `https://picsum.photos/720/720?nocache=${Math.random()}`,
    relatedUsers: [
      {
        name: 'michaelmicha',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
        role: 'creator',
      },
    ],
  },
  history: [
    {
      type: AuctionHistoryItemType.MINT,
      user: {
        name: 'katyperry',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
      },
      timestamp: dayjs().subtract(4, 'd').subtract(6433, 'm').unix(),
    },
    {
      type: AuctionHistoryItemType.LISTED,
      user: {
        name: 'katyperry',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
      },
      price: {
        amount: '8.00',
        currencyName: 'pixel',
      },
      timestamp: dayjs().subtract(4, 'd').subtract(6432, 'm').unix(),
    },
    {
      type: AuctionHistoryItemType.BID_PLACED,
      user: {
        name: 'katyperry',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
      },
      price: {
        amount: '12.4627',
        currencyName: 'pixel',
      },
      timestamp: dayjs().subtract(3, 'd').subtract(32, 'm').unix(),
    },
    {
      type: AuctionHistoryItemType.BID_PLACED,
      user: {
        name: 'katyperry',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
      },
      price: {
        amount: '12.4627',
        currencyName: 'pixel',
      },
      timestamp: dayjs().subtract(2, 'd').subtract(1445, 'm').unix(),
    },
    {
      type: AuctionHistoryItemType.BID_PLACED,
      user: {
        name: 'katyperry',
        profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
        profileUrl: '/',
      },
      price: {
        amount: '12.4627',
        currencyName: 'pixel',
      },
      timestamp: dayjs().subtract(2, 'd').subtract(1111, 'm').unix(),
    },
  ],
}

const MOCK_CREATORS: Creator[] = [
  {
    id: 0,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: true,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 1,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 4,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 5,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 6,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 7,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: true,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 8,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 9,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 10,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 11,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 12,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 13,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 14,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 15,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 16,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 17,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: true,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 18,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 19,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 20,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 21,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 22,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 23,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: false,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
  {
    id: 24,
    name: 'Michael Pink',
    username: 'michaelmicha',
    imgSrc: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    profileUrl: '/',
    role: 'owner',
    followers: 128,
    isVerified: true,
    isFollowing: false,
    collection: {
      id: 1,
      name: 'Weak-Key Distinguishers for AES Bubbles',
      imgSrc: `https://picsum.photos/232/232?nocache=${Math.random()}`,
      relatedUsers: [
        {
          profileImg: `https://picsum.photos/96/96?nocache=${Math.random()}`,
          name: 'michaelmicha',
          profileUrl: '/',
          role: 'creator',
        },
      ],
    },
  },
]
const MOCK_WALLETS = [
  {
    id: 1,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Trail',
    currencyCode: 'TRAIL',
    amountCoins: '200.3743423',
    amountUSD: '2,193.1483',
  },
  {
    id: 2,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Monkey coin',
    currencyCode: 'MNK',
    amountCoins: '8237.29',
    amountUSD: '1,204.4729',
  },
  {
    id: 3,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Dogecoin',
    currencyCode: 'DGC',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 4,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Etherium',
    currencyCode: 'ETH',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 5,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Bitcoin',
    currencyCode: 'BTC',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 6,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Ape coin',
    currencyCode: 'APC',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 7,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Chia',
    currencyCode: 'CHI',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 8,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Binance',
    currencyCode: 'BNC',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 9,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Stablecoin',
    currencyCode: 'USDC',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
  {
    id: 10,
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    name: 'Next',
    currencyCode: 'NXT',
    amountCoins: '82.3729',
    amountUSD: '1,204.4729',
  },
]
const MOCK_TRANSACTIONS = [
  {
    id: 16383816,
    type: TransactionType.CONVERT,
    status: TransactionStatus.COMPLETED,
    timestampCreated: dayjs().subtract(2, 'm').unix(),
    amountMain: {
      amount: '20.2833',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
  {
    id: 263464718,
    type: TransactionType.CONVERT,
    status: TransactionStatus.IN_PROCESS,
    timestampCreated: dayjs().subtract(2, 'd').add(2, 'm').unix(),
    amountMain: {
      amount: '20.2833',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
  {
    id: 848159291,
    type: TransactionType.SEND,
    status: TransactionStatus.IN_PROCESS,
    timestampCreated: dayjs().subtract(3, 'd').subtract(22, 'm').unix(),
    amountMain: {
      isNegative: true,
      amount: '84.2282',
      currency: 'TRAIL',
    },
    user: {
      name: '@elonmusk',
      profileUrl: '/',
    },
  },
  {
    id: 848596291,
    type: TransactionType.RECEIVE,
    status: TransactionStatus.IN_PROCESS,
    timestampCreated: dayjs().subtract(6, 'd').subtract(608, 'm').unix(),
    amountMain: {
      isNegative: true,
      amount: '84.2282',
      currency: 'TRAIL',
    },
    user: {
      name: '@katyperry',
      profileUrl: '/',
    },
  },
  {
    id: 399434912,
    type: TransactionType.CONVERT,
    status: TransactionStatus.COMPLETED,
    timestampCreated: dayjs().subtract(6, 'd').subtract(283, 'm').unix(),
    amountMain: {
      amount: '2.6482',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
  {
    id: 848592921,
    type: TransactionType.RECEIVE,
    status: TransactionStatus.FAILED,
    timestampCreated: dayjs().subtract(12, 'd').add(54, 'm').unix(),
    amountMain: {
      isNegative: true,
      amount: '84.2282',
      currency: 'TRAIL',
    },
    user: {
      name: '@timcook',
      profileUrl: '/',
    },
  },
  {
    id: 8485769292,
    type: TransactionType.SEND,
    status: TransactionStatus.IN_PROCESS,
    timestampCreated: dayjs().subtract(16, 'd').add(242, 'm').unix(),
    amountMain: {
      isNegative: true,
      amount: '84.2282',
      currency: 'TRAIL',
    },
    user: {
      name: '@gaben',
      profileUrl: '/',
    },
  },
  {
    id: 848592092,
    type: TransactionType.SEND,
    status: TransactionStatus.COMPLETED,
    timestampCreated: dayjs().subtract(20, 'd').subtract(156, 'm').unix(),
    amountMain: {
      isNegative: true,
      amount: '84.2282',
      currency: 'TRAIL',
    },
    user: {
      name: '@garry',
      profileUrl: '/',
    },
  },
  {
    id: 236346718,
    type: TransactionType.CONVERT,
    status: TransactionStatus.COMPLETED,
    timestampCreated: dayjs().subtract(24, 'd').add(823, 'm').unix(),
    amountMain: {
      amount: '20.2833',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
  {
    id: 264346718,
    type: TransactionType.CONVERT,
    status: TransactionStatus.IN_PROCESS,
    timestampCreated: dayjs().subtract(120, 'd').add(444, 'm').unix(),
    amountMain: {
      amount: '20.2833',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
  {
    id: 263467718,
    type: TransactionType.CONVERT,
    status: TransactionStatus.FAILED,
    timestampCreated: dayjs().subtract(180, 'd').unix(),
    amountMain: {
      amount: '20.2833',
      currency: 'KPE',
    },
    amountExtra: {
      isNegative: true,
      amount: '1.2810',
      currency: 'TRAIL',
    },
  },
]

const MOCK_RECIPIENTS = [
  {
    name: 'elonmusk',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0x1234',
    walletFundsTrail: '42,540',
  },
  {
    name: 'elonsmith',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0xabcd',
    walletFundsTrail: '440',
  },
  {
    name: 'elongreen',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0x5678',
    walletFundsTrail: '460',
  },
  {
    name: 'elongrey',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0x1235',
    walletFundsTrail: '2,800',
  },
  {
    name: 'elonjobs',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0x1248',
    walletFundsTrail: '3,200',
  },
  {
    name: 'katyperry',
    img: `https://picsum.photos/96/96?nocache=${Math.random()}`,
    walletAddress: '0x0001',
    walletFundsTrail: '2,2135',
  },
]

const MOCK_EXCHANGE_COURSES: { [key: string]: any } = {
  TRAIL: { TRAIL: 1, MNK: 2.5, DGC: 10 },
  MNK: { TRAIL: 0.4, MNK: 1, DGC: 4 },
  DGC: { TRAIL: 0.1, MNK: 0.25, DGC: 1 },
}

const MOCK_CARD_POOLS = [
  {
    id: 1,
    name: 'PixelVerse',
    description: 'A Complete DeFi Experience.',
    imgSrc: `https://picsum.photos/600/600?nocache=${Math.random()}`,
    coinName: 'PIXEL',
    coinImgSrc: `https://picsum.photos/80/80?nocache=${Math.random()}`,
    followers: 128186,
    timestampEndsAt: dayjs().add(168523, 's').unix(),
  },
  {
    id: 2,
    name: 'PixelVerse',
    description: 'A Complete DeFi Experience.',
    imgSrc: `https://picsum.photos/600/600?nocache=${Math.random()}`,
    coinName: 'PIXEL',
    coinImgSrc: `https://picsum.photos/80/80?nocache=${Math.random()}`,
    followers: 128186,
    timestampEndsAt: dayjs().add(68523, 's').unix(),
  },
  {
    id: 3,
    name: 'PixelVerse',
    description: 'A Complete DeFi Experience.',
    imgSrc: `https://picsum.photos/600/600?nocache=${Math.random()}`,
    coinName: 'PIXEL',
    coinImgSrc: `https://picsum.photos/80/80?nocache=${Math.random()}`,
    followers: 128186,
    timestampEndsAt: dayjs().add(1234, 's').unix(),
  },
  {
    id: 4,
    name: 'PixelVerse',
    description: 'A Complete DeFi Experience.',
    imgSrc: `https://picsum.photos/600/600?nocache=${Math.random()}`,
    coinName: 'PIXEL',
    coinImgSrc: `https://picsum.photos/80/80?nocache=${Math.random()}`,
    followers: 128186,
    timestampEndsAt: dayjs().add(58, 's').unix(),
  },
]

export {
  MOCK_LIVE_AUCTIONS,
  MOCK_COLLECTIONS,
  MOCK_AUCTIONS_EXPLORE,
  MOCK_AUCTION_DETAILS_ITEM,
  MOCK_WALLETS,
  MOCK_TRANSACTIONS,
  MOCK_CREATORS,
  MOCK_RECIPIENTS,
  MOCK_EXCHANGE_COURSES,
  MOCK_CARD_POOLS,
}
