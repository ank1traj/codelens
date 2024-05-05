const apiUrl = 'http://localhost:8080' // Base URL of your API

// Utility function for making API requests
const ApiRequest = async (url, method = 'GET', payload = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
            // Add any other headers you need
        }
    }

    if (payload) {
        options.body = JSON.stringify(payload)
    }

    try {
        const response = await fetch(`${apiUrl}/${url}`, options)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error // Propagate the error to the caller
    }
}

export default ApiRequest
