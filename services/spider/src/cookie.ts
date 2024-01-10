import fetch from 'cross-fetch'
import CryptoJS from 'crypto-js'

interface cookie {
    domain: string,
    expirationDate: number,
    hostOnly: boolean,
    httpOnly: boolean,
    name: string,
    path: string,
    sameSite: 'no_restriction' | 'lax' | 'unspecified',
    secure: boolean,
    session: boolean,
    storeId: string,
    value: string,
}

export async function cloud_cookie(host: string, uuid: string, password: string) {
    const url = host + '/get/' + uuid
    const ret = await fetch(url)
    const json = await ret.json()
    let cookies: cookie[] = []
    let local_storage: any[] = []
    if (json && json.encrypted) {
        const { cookie_data, local_storage_data } = cookie_decrypt(uuid, json.encrypted, password)
        for (const key in cookie_data) {
            // merge cookie_data[key] to cookies
            cookies = cookies.concat(cookie_data[key].map((item: cookie) => {
                if (item.sameSite == 'unspecified') item.sameSite = 'lax'
                return item
            }))
            local_storage = local_storage.concat(local_storage_data[key].map((item: cookie) => {
                if (item.sameSite == 'unspecified') item.sameSite = 'lax'
                return item
            }))
        }
    }
    return {
        cookies,
        local_storage,
    }
}

export function cookie_decrypt(uuid: string, encrypted: string, password: string) {
    const the_key = CryptoJS.MD5(uuid + '-' + password).toString().substring(0, 16)
    const decrypted = CryptoJS.AES.decrypt(encrypted, the_key).toString(CryptoJS.enc.Utf8)
    const parsed = JSON.parse(decrypted)
    return parsed
}
