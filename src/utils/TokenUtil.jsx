function TokenUtil() {
	return {
		isTokenPresent: async () => {
			return !!localStorage.getItem('mdkfkdfkdfmkdmfkdmfk_token');
		},
		storeToken: async (token) => {
			localStorage.setItem('mdkfkdfkdfmkdmfkdmfk_token', token);
		},
		clearToken: async () => {
			localStorage.removeItem('mdkfkdfkdfmkdmfkdmfk_token');
		},
		retrieveToken() {
			return localStorage.getItem('mdkfkdfkdfmkdmfkdmfk_token');
		}
	}
}


export default TokenUtil;