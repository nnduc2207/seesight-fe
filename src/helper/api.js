export default class ApiService {
  constructor(token, history, dispath) {
    this.token = token;
    this.history = history;
    this.dispath = dispath;
  }

  get = async (url, param) => {
    if(!url.startsWith('http')) url = process.env.REACT_APP_SERVER_API + url;
    if(param && Object.keys(param)) {
      url += '?';
      for (const key in param) {
        url +=  `${key}=${param[key]}`;
      }
    }
    const response = await fetch(
      url,
      {
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
        }),
        method: "GET",
      }
    )

    const result = await response.json()

    if (result.error) {
      console.log('err', result.error);
      if(typeof result.error == 'object' && result.error.name == 'TokenExpiredError') {
        this.dispath({ type: "LOGOUT" })
        return this.history.push("/login")
      }
      throw result.error
    }

    return result
  }
  
  post = async (url, body) => {
    if(!url.startsWith('http')) url = process.env.REACT_APP_SERVER_API + url;
    const response = await fetch(
      url,
      {
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`,
        }),
        method: "POST",
        body: JSON.stringify(body),
      }
    )

    const result = await response.json()

    if (result.error) {
      throw result.error
    }

    return result
  }
}