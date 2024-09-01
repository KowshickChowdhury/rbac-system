const RolePermissionsApis = {};

RolePermissionsApis.index = async() => {
    const res = await axios.get("/api/role-permissions")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

RolePermissionsApis.getRolePermissions = async() => {
    const res = await axios.get("/api/profile")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

RolePermissionsApis.store = async(data) => {
    let url = `/api/create-role-permissions`;
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

RolePermissionsApis.edit = async($id) => {
    const res = await axios.get(`/api/edit-role-permissions/${$id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

RolePermissionsApis.update = async(data, id) => {
    let url = `/api/update-role-permissions/${id}`;
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

RolePermissionsApis.delete = async (id) => {
    const url = `/api/delete-role-permissions/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default RolePermissionsApis;