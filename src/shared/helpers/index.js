import { EMAILREJEX, PHONEBUMBERREJEX } from "@rejex"

// Функции для валидации данных
export const isValidEmail = (email) => {
  return EMAILREJEX.test(email)
}
export const isValidPhone = (phoneNumber) => {
  return PHONEBUMBERREJEX.test(phoneNumber)
}

// Другие вспомогательные функции
export const removeWildcard = (path) => {
  return path.replace("/*", "")
}
