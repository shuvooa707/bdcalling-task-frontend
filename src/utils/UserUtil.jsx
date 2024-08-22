function UserUtil() {
	return {
		isUserPresent: async () => {
			return !!localStorage.getItem('mdkfkdfkdfmkdmfkdmfk_user');
		},
		storeUser: async user => {
			const userTmp = JSON.stringify(user);
			localStorage.setItem('mdkfkdfkdfmkdmfkdmfk_user', userTmp);
		},
		clearUser: async () => {
			localStorage.removeItem('mdkfkdfkdfmkdmfkdmfk_user');
		},
		retrieveUser() {
			try {
				return JSON.parse(localStorage.getItem('mdkfkdfkdfmkdmfkdmfk_user'));
			} catch (error) {
				return {};
			}
		}
	}
}


export default UserUtil;