import clientCatchError from "./clientCatchError"
import httpRequest from "./http"

const fetcher = async(url: string) => {
    try {
        await httpRequest.get(url)
    } 
    catch (error) {
       return clientCatchError(error) 
    }
}

export default fetcher