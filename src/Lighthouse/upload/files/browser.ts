/* istanbul ignore file */
import axios from 'axios'
import FormData from 'form-data'
import { lighthouseConfig } from '../../../lighthouse.config'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default async (
  files: any,
  accessToken: string,
  uploadProgressCallback = (data: any) => {}
) => {
  try {
    const endpoint = lighthouseConfig.lighthouseNode + '/api/v0/add'
    let mimeType = null
    if (files.length === 1) {
      mimeType = files[0].type
    }

    const formData = new FormData()
    const boundary = Symbol()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }

    const token = 'Bearer ' + accessToken

    const response = await axios.post(endpoint, formData, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Content-type': `multipart/form-data; boundary= ${boundary.toString()}`,
        Encryption: `${false}`,
        'Mime-Type': mimeType,
        Authorization: token,
      },
      onUploadProgress: function (progressEvent) {
        const _progress = Math.round(progressEvent.loaded / progressEvent.total)
        uploadProgressCallback({
          progress: _progress,
          total: progressEvent.total,
          uploaded: progressEvent.loaded,
        })
      },
    })

    if (typeof response.data === 'string') {
      const temp = response.data.split('\n')
      response.data = JSON.parse(temp[temp.length - 2])
    }

    /*
      {
        data: {
          Name: 'flow1.png',
          Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
          Size: '31735'
        }
      }
    */
    return { data: response.data }
  } catch (error: any) {
    throw new Error(error?.message)
  }
}
