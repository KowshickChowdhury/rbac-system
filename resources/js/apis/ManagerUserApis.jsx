const ManagerUserApis = {};

ManagerUserApis.store = async(data) => {
    let url = `/api/manager/create-user`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                errors: error.response.data.errors,
                message: error.response.data.message
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                message: "No response received from the server."
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                message: "An error occurred while processing the request."
            };
        }
    }
}

export default ManagerUserApis;