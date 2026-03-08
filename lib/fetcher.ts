import clientCatchError from "./clientCatchError"
import httpRequest from "./http"

const fetcher = async(url: string) => {
    try {
        const {data} = await httpRequest.get(url)
        return data
    } 
    catch (error) {
       return clientCatchError(error) 
    }
}

export default fetcher