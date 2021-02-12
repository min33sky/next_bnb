# Next_Airbnb Clone

> 제곧내

```javascript
// ? Date() 사용 시 결과에 한글이 들어가서 toISOString() 사용 안하면
// ? TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Set-Cookie"] 발생
const setToken = `access_token=${token}; path=/; expires=${new Date(
  Date.now() + 60 * 60 * 24 * 1000 * 3 // 3일
).toISOString()}; httponly`;

console.log('토큰 : ', setToken);
```

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

- 이미 res로 응답했는데 다시 res로 응답할 때 발생

## Modules

- react-outside-click-handler
