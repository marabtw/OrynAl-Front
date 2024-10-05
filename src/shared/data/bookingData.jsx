import table1 from "../assets/images/table1.jpeg"

import firstDishCategory from "../assets/images/firstDishCategory.jpeg"
import secondDishCategory from "../assets/images/secondDishCategory.png"
import saladCategory from "../assets/images/saladCategory.png"

import saladMenu from "../assets/images/saladMenu1.jpeg"

import saladIcon from "../assets/images/saladicon.png"
import softDrinkIcon from "../assets/images/softdrinksIcon.png"
import steakIcon from "../assets/images/steakIcon.png"
import pizzaIcon from "../assets/images/pizzaIcon.png"

const getId = () => {
  return Math.floor(Math.random() * 99999999999)
}

export const dataBookingTables = [
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
  {
    icon: table1,
    tableNumber: 1,
    type: "Основной зал",
    capacity: 10,
    status: true,
  },
]

export const dataFoodCategories = [
  {
    image: firstDishCategory,
    title: "Первое блюдо",
  },
  {
    image: secondDishCategory,
    title: "Второе блюдо",
  },
  {
    image: saladCategory,
    title: "Салаты",
  },
  {
    image: "",
    title: "Пицца",
  },
  {
    image: "",
    title: "Фаст-Фуд",
  },
]

export const dataSalads = [
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
  {
    id: getId(),
    image: saladMenu,
    nameOfSalad: "Свежий Салат",
    description:
      "блюдо из смеси овощей и салатных листьев с добавлением зелени, семян, специй, грибов и иногда фруктов.",
    cost: 2000,
  },
]

export const dataCart = [
  {
		id:getId(),
    name: "Фирменный салат",
    price: 3000,
    amount: 2,
    icon: saladIcon,
  },
  {
		id:getId(),
    name: "Кола",
    price: 2100,
    amount: 3,
    icon: softDrinkIcon,
  },
  {
		id:getId(),
    name: "Стэйк из семги",
    price: 3400,
    amount: 1,
    icon: steakIcon,
  },
  {
		id:getId(),
    name: "Пицца Мексикано",
    price: 2200,
    amount: 1,
    icon: pizzaIcon,
  },
]