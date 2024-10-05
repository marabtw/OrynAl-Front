import { Link } from "react-router-dom"

const CreateButton = ({ to = "/", onClick }) => {
  return (
    <>
      {onClick ? (
        <button
          className="h-max px-[20px] py-[5px] text-[15px] leading-[17.25px] text-white rounded-[5px] bg-[#6AA7FC]"
          onClick={onClick}
        >
          Cоздать
        </button>
      ) : (
        <Link
          to={to}
          className="h-max px-[20px] py-[5px] text-[15px] leading-[17.25px] text-white rounded-[5px] bg-[#6AA7FC]"
        >
          Cоздать
        </Link>
      )}
    </>
  )
}

export default CreateButton
