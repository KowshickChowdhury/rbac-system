const PermissionApis = {};

PermissionApis.index = async() => {
    const res = await axios.get("/api/permissions")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

export default PermissionApis;