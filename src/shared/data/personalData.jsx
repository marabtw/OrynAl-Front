import sandyq from "../assets/images/sandyq.jpeg"

const getId = () => {
  return Math.floor(Math.random() * 99999999999)
}

export const dataOrderHistory = [
	{
		id: getId(),
		name: "Sandyq",
		image: sandyq,
		address: 'Абай, 101',
		date: "01.02.2021",
		status: "booked",
	},
	{
		id: getId(),
		name: "Sandyq",
		image: sandyq,
		address: 'Абай, 101',
		date: "01.02.2021",
		status: "booked",
	},
	{
		id: getId(),
		name: "Sandyq",
		image: sandyq,
		address: 'Абай, 101',
		date: "01.02.2021",
		status: "cancelled",
	},
	{
		id: getId(),
		name: "Sandyq",
		image: sandyq,
		address: 'Абай, 101',
		date: "01.02.2021",
		status: "completed",
	},
	{
		id: getId(),
		name: "Sandyq",
		image: sandyq,
		address: 'Абай, 101',
		date: "01.02.2021",
		status: "booked",
	},
]