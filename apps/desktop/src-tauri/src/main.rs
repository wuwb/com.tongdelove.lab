use serde::{Deserialize, Serialize};
use std::error::Error;
use serde_json::from_str;
use aes_gcm::{
    aead::{Aead, NewAead},
    Aes256Gcm,
};
use base64::decode;
use hex::decode as hex_decode;

const PKCS5_SALT_LEN: usize = 8;
const AES256_KEY_LEN: usize = 32;

#[derive(Debug, Serialize, Deserialize)]
struct CookieCloudBody {
    uuid: String,
    encrypted: String,
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn cookie_decrypt(uuid: &str, encrypted: &str, password: &str) -> String {
    // 计算MD5哈希值并取前16字节作为密钥

    let str_value: &str = md5::compute(format!("{}-{}", uuid, encrypted));
    let the_key = &str_value.chars().take(16).collect::<String>();

    // 对加密数据进行Base64解码
    let decrypted_str = decrypt_aes_utf8(encrypted, &the_key)?;

    from_str(&decrypted_str)
}

fn decrypt_aes_utf8(encrypted: &str, the_key: &str) -> Result<String, Box<dyn Error>> {
    // 对密钥进行十六进制解码（假设密钥是以十六进制形式给出的，类似于CryptoJS中的情况）
    let key_bytes = hex_decode(the_key)?;

    // 对加密数据进行Base64解码
    let encrypted_bytes = decode(encrypted)?;

    // 创建AES-256-GCM解密器
    let cipher = Aes256Gcm::new(key_bytes.as_slice().try_into()?);

    // 解密数据，这里假设没有额外的认证标签（如果有，需要根据实际情况处理）
    let nonce = &encrypted_bytes[0..12];
    let ciphertext = &encrypted_bytes[12..];
    let decrypted_bytes = cipher.decrypt(nonce, ciphertext)?;

    // 将解密后的字节数据转换为UTF-8字符串
    Ok(String::from_utf8(decrypted_bytes)?)
}


#[tauri::command]
async fn cookieTest() -> Result<(), Box<dyn Error>> {
    let api_url = "http://192.168.1.10:3004/cookie";
    let uuid = "oYqtkKDPtkEk4PBbZS8NdP";
    let password = "qrZjemWHHyGgK3EmeBUJFx";

    let client = reqwest::Client::new();
    let res = client
      .get(format!("{}/get/{}", api_url, uuid))
      .send()
      .await?;

    if res.status().is_success() {
        let body = res.text().await?;
        let data: CookieCloudBody = serde_json::from_str(&body)?;

        // 实现 data 解密，解密后赋值给 decrypted

        let decrypted = cookie_decrypt(&uuid, &body, &password);

        format!("Decrypted: {}", &decrypted);
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
