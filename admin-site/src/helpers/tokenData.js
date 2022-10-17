import Cookies from 'js-cookie'
const tokenData = {
    headers: {
        "x-access-token": Cookies.get("token")
    }
}
export default tokenData