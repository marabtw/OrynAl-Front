import { DropDownIcon } from "@ui/icons/icons"

const ListCategories = ({ categories }) => {
  return (
    <li className={`grid w-full px-[20px] py-[10px] bg-white rounded-[20px] max-md:hidden`} 
		style={{gridTemplateColumns: `.5fr repeat(${categories.length - 2},1fr) .4fr`}}>
      {categories.map((category) =>
        (category === "id" || category === "ID") ? (
          <div key={category + `${Math.random()}`} className="flex">
            <h5 className="flex items-center gap-[5px] cursor-pointer">
              {category} <DropDownIcon />
            </h5>
          </div>
        ) : (
          <div key={category + `${Math.random()}`} className="flex justify-center">
            <h5 className="cursor-pointer">{category}</h5>
          </div>
        )
      )}
    </li>
  )
}

export default ListCategories