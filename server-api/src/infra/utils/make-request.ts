import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

/** @description Performs the request regardless of the configuration */
async function makeRequest(options: AxiosRequestConfig) {
  try {
    const response = await axios(options)
      .then(function (response: AxiosResponse) {
        return response
      })
      .catch((err: AxiosError) => {
        return err.response
      })
    return response
  } catch (error) {
    return error
  }
}

export { makeRequest }
