import sandyq from "../assets/images/sandyq.jpeg"
import brazile from "../assets/images/brazile.jpeg"
import sandyq1 from "../assets/images/sandyq1.jpeg"
import sandyq2 from "../assets/images/sandyq2.jpeg"
import sandyq3 from "../assets/images/sandyq3.jpeg"

import table1 from "../assets/images/table1.jpeg"

import secondDishCategory from "../assets/images/secondDishCategory.png"

import saladMenu from "../assets/images/saladMenu1.jpeg"

const getId = () => {
  return Math.floor(Math.random() * 99999999999)
}

const randomRating = () => {
  const random = Math.floor(Math.random() * 5)
  const isDivRandom = Math.floor(Math.random() * 2) + 1
  return random / isDivRandom
}

export const dataMyRestaurantsList = [
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
  {
    id: getId(),
    image: sandyq,
    name: "Sandyq",
    description:
      "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд",
    rate: 9,
    attendance: 324,
  },
]

export const dataMyRestaurantMenus = [
  {
    id: getId(),
    image: saladMenu,
    name: "Шашлык",
    type: "Второе блюдо",
    description: "Описание",
    price: "990.00",
    available: true,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Шашлык",
    type: "Второе блюдо",
    description: "Описание",
    price: "990.00",
    available: true,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Шашлык",
    type: "Второе блюдо",
    description: "Описание",
    price: "990.00",
    available: true,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Шашлык",
    type: "Второе блюдо",
    description: "Описание",
    price: "990.00",
    available: true,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Шашлык",
    type: "Второе блюдо",
    description: "Описание",
    price: "990.00",
    available: true,
  },
]

export const dataMyRestaurantTables = [
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
  {
    id: getId(),
    image: saladMenu,
    name: "Столик #1",
    type: "Общий зал",
    capacity: 4,
  },
]

export const dataRestaurantUpdate = {
  id: getId(),
  name: "Sandyq",
  address: "Абай, 101",
  image: sandyq,
  images: [sandyq1, sandyq2, sandyq3],
  description: "#101",
  workingHours: "10:00-22:00",
  city: "Алматы",
  services: ["Банкетный зал", "Кальянная", "Под ритмом диджея"],
}
export const dataTableUpdate = {
  id: getId(),
  name: "Столик #1",
  type: "Тапчан",
  image: table1,
  description: "#101",
  capacity: 10,
}
export const dataMenuUpdate = {
  id: getId(),
  name: "Манты",
  type: "Второй",
  image: secondDishCategory,
  description: "#101",
	price: "1200.00",
	status: "Забронирован",
  capacity: 10,
}

export const dataServices = [
  "Место, где можно поработать",
  "Под ритмом диджея",
  "Живая музыка",
  "Бар, где пиво без границ",
  "Банкетный зал",
  "С детской игровой комнатой",
  "Кальянная",
  "Своя кондитерская",
]
