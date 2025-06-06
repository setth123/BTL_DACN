function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1]; 
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
  export const checkAndRemoveExpiredToken = () => {
    const token=JSON.parse(localStorage.getItem('accessToken')).token;
    if (!token) return;
  
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return;
  
    const currentTime = Date.now(); 
    const expTime = payload.exp * 1000; 
  
    if (currentTime > expTime) {
      console.log("Token đã hết hạn");
      localStorage.removeItem("accessToken");
    }
  };
  