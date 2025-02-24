import uploadBuffer from './node'
import uploadTypedArray from './browser'

export default async (
  buffer: any, 
  apiKey: string
) => {
  // Upload File to IPFS
  // @ts-expect-error
  if (typeof window === "undefined") {
    return await uploadBuffer(buffer, apiKey)
  } else {
    return await uploadTypedArray(buffer, apiKey)
  }
}
