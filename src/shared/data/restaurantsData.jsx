import sandyq from "../assets/images/sandyq.jpeg"
import brazile from "../assets/images/brazile.jpeg"

const getId = () => {
  return Math.floor(Math.random() * 99999999999)
}

const randomRating = () => {
  const random = Math.floor(Math.random() * 5)
  const isDivRandom = Math.floor(Math.random() * 2) + 1
  return random / isDivRandom
}

export const dataRestaurants = [
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    fullName: "Sandyq | National restaurant",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд.",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
    workingHours: "10:00-22:00",
    call: "8 (747) 122 11 22",
  },
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: brazile,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
]

export const dataPopularRestaurants = [
  {
    id: getId(),
    image: sandyq,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: sandyq,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
  {
    id: getId(),
    image: sandyq,
    name: "Little Brazile",
    rate: randomRating(),
    categories: "Ресторан, бары, караоке",
    address: "Улица Аль Фараби 32",
  },
]






