const RoleApis = {};

RoleApis.index = async() => {
    const res = await axios.get("/api/roles")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

RoleApis.update = async(data) => {
    let url = `/api/user-update`;
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

export default RoleApis;