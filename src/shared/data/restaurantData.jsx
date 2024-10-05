import sandyq from "../assets/images/sandyq.jpeg"
import brazile from "../assets/images/brazile.jpeg"
import sandyq1 from "../assets/images/sandyq1.jpeg"
import sandyq2 from "../assets/images/sandyq2.jpeg"
import sandyq3 from "../assets/images/sandyq3.jpeg"

import workIcon from "../assets/images/workIcon.png"
import beerIcon from "../assets/images/beerIcon.png"
import pianoIcon from "../assets/images/pianoIcon.png"
import hookahIcon from "../assets/images/hookahIcon.png"
import wifiIcon from "../assets/images/wifi.png"

import avatar from "../assets/images/avatarIcon.jpeg"

export const dataRestaurant = {
  icon: sandyq,
  name: "Little Brazile",
  fullName: "Sandyq | National restaurant",
  description:
    "Цель ресторана - показать вековые традиции как в приготовлении так и в подаче блюд.",
  categories: "Ресторан, бары, караоке",
  address: "Улица Аль Фараби 32",
  workingHours: "10:00-22:00",
  call: "8 (747) 122 11 22",
  images: [sandyq1, sandyq2, sandyq3, sandyq1, sandyq2, sandyq3],
  comments: [
    {
      icon: avatar,
      name: "Shakh Manbayev",
      data: "29.03.2022",
      rate: 2,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      icon: avatar,
      name: "Shakh Manbayev",
      data: "29.03.2022",
      rate: 3.5,
      comment:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover ",
    },
    {
      icon: avatar,
      name: "Shakh Manbayev",
      data: "29.03.2022",
      rate: 3.5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      icon: avatar,
      name: "Shakh Manbayev",
      data: "29.03.2022",
      rate: 3.5,
      comment:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
  ],
  services: [
    {
      icon: workIcon,
      desc: "Место , где можно поработать",
    },
    {
      icon: beerIcon,
      desc: "Бар , где пиво без границ",
    },
    {
      icon: pianoIcon,
      desc: "Живая музыка",
    },
    {
      icon: hookahIcon,
      desc: "Кальянная",
    },
    {
      icon: wifiIcon,
      desc: "Есть бесплатный WI-FI",
    },
  ],
}