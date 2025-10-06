# 🔐 Crypter

Crypter is a secure, offline password manager built with **React Native**.  
It stores user credentials locally using strong encryption and biometric authentication, ensuring full privacy without relying on external servers.

## ✨ Features

- Local encrypted password storage (AES-256 + Android Keystore / iOS Keychain)
- Password leak check using **Have I Been Pwned**
- Random password generation
- Email breach verification
- 100% offline and free to use

## 🌐 APIs Used

| Purpose               | API                                                      | Description                                            |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| Email breach checker  | [XposedOrNot](https://xposedornot.com/api_doc)           | Check if an email has appeared in public data breaches |
| Password leak checker | [Pwned Passwords](https://api.pwnedpasswords.com/range/) | Verify if a password has been compromised              |
| Password generator    | [PasswordWolf](https://passwordwolf.com/api/)            | Generate random, strong passwords                      |

## ⚙️ Tech Stack

- **React Native** (Expo or CLI)
- **Encrypted Storage** for local data
- **TypeScript**

## 🚀 Summary

Crypter keeps your passwords safe, private, and always under your control — no cloud, no subscriptions, no risks.
