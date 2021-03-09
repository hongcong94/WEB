const setRememberMe = (isRememberme) => {
    localStorage.setItem('isRememberMe',isRememberme);
};

const isRememberMe = () => {
    if (localStorage.getItem('isRememberme') === null || localStorage.getItem('isRememberMe') !== undefined) {
       // convert string to boolean
    return JSON.parse(localStorage.getItem('isRememberMe'));
    }
    return true ;
}

const setItem = (key,value) => {
    if (isRememberMe()) {
        localStorage.setItem(key,value);
    }else {
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if (isRememberMe()) {
        localStorage.getItem(key);
        return localStorage.getItem(key);
    }else {
        return sessionStorage.getItem(key);
    }
}

const setToken = (token) => {
    setItem("token", token);
};

const getToken = () => {
    return getItem("token");
}

const setUserInfo = (firstName,lastName,userName,email,role,status) => {
    setItem("firstName",firstName);
    setItem("lastName",lastName);
    setItem("userName",userName);
    setItem("email",email);
    setItem("role",role);
    setItem("status",status);
}

const getUserInfo = () => {
    return {
        "firstName": getItem("firstName"),
        "lastName":  getItem("lastName"),
        "userName":  getItem("userName"),
        "email":     getItem("email"),
        "role":      getItem("role"),
        "status":    getItem("status")
    };
}


// export
const storage = { isRememberMe,setRememberMe,setToken, getToken,setUserInfo, getUserInfo };
export default storage;