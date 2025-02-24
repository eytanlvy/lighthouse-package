import browser from './browser'
import uploadFile from './node'

export default async (
  path: string | any,
  apiKey: string,
  publicKey: string,
  signedMessage: string,
  uploadProgressCallback = (data: any) => {}
) => {
  // Upload File to IPFS
  // @ts-expect-error
  if (typeof window === "undefined") {
    return await uploadFile(path, apiKey, publicKey, signedMessage)
  } else {
    return await browser(
      path,
      apiKey,
      publicKey,
      signedMessage,
      uploadProgressCallback
    )
  }
}
