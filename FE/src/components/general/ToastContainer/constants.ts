const TOAST_CONTENTS = {
  registerSuccess: {
    heading: 'Welcome Aboard!',
    text: 'You were successfully registered',
  },
  registerError: {
    heading: 'Register Error',
    text: 'Unable to register. Please, try again later',
  },
  mintSuccess: {
    heading: 'Success!',
    text: 'Your NFT minting is pending',
  },
  mintError: {
    heading: 'Error',
    text: 'Could not mint your NFT',
  },
  approveSuccess: {
    heading: 'Success!',
    text: 'Approval confirmed. You can now purchase the NFT',
  },
  approveError: {
    heading: 'Error',
    text: 'Could not approve this transaction',
  },
  purchaseSuccess: {
    heading: 'Success!',
    text: 'Your purchase is pending',
  },
  purchaseError: {
    heading: 'Error',
    text: 'Could not complete the purchase',
  },
  missingMetaMask: {
    heading: 'MetaMask not found',
    text: 'Please, install the MetaMask extension',
  },
  transactionSuccess: {
    heading: 'Success!',
    text: 'Your transaction was send for processing',
  },
}

export default TOAST_CONTENTS
