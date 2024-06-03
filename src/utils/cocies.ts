import Cookies from 'js-cookie'


export const getCookies = (title:string) => {
    return Cookies.get(title)
}

export const setCookies = (title:string, value:string) => {
    return Cookies.set(title, value)
}

export const removeCookies = (title:string) => {
    return Cookies.remove(title)
}

export const removeCookiesAll =(removNames:string[]) => {
    return removNames.forEach((name) =>{
        Cookies.remove(name)
    })
}


