const login = async function ({dispatch}, {tokenType, accessToken}) {
    localStorage.clear();
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isLogin', true);
    await dispatch('user/setUserInfo', null, { root: true });
};

const logout = async function () {
    localStorage.clear();
    window.location.reload();
};

const actions = {
    login,
    logout
};

export default actions