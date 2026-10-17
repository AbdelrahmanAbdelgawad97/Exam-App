import { TOKEN_KEY } from "../feature/constant/constant.toke"



interface IUseTokenInterface {
    getToken:()=> string | null,
    removeToken:()=> void,
    setToken:(token: string) => void,
}

export default function useToken (): IUseTokenInterface {

    function getToken() {
        return localStorage.getItem(TOKEN_KEY) ?? null;
    }
    function setToken(token: string) {
        localStorage.setItem(TOKEN_KEY,token);
    }
    function removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    return {getToken , setToken , removeToken}
}