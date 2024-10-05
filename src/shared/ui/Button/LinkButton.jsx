import { AuthContext } from "@context/AuthContext"
import { removeWildcard } from "@helpers/index"
import { ROUTERS } from "@router/Router.config"
import { useContext } from "react"
import { Link } from "react-router-dom"

const LinkButton = ({
  text,
  to,
  onClick,
  uppercase,
  className,
  spacingClass,
  textClass,
  needAuth,
}) => {
  const { isAuthed } = useContext(AuthContext)

	const getTo = () => {
    if (needAuth && !isAuthed) {
      return `${removeWildcard(ROUTERS.Authorization.root)}${ROUTERS.Authorization.login}`
    }
    return to
  }


  return (
    <Link
      to={getTo()}
      className={`flex items-center justify-center 
				max-w-max rounded-[10px] 
				${textClass ? textClass : "text-[20px] font-[600] leading-[30px]"}
				bg-gradient-to-r from-[#62ADFC] to-[#4277FB] text-white 
				transition-all duration-75
				${uppercase && "uppercase"} ${className} ${
        spacingClass ? spacingClass : "px-10 py-5"
      }
				hover:scale-105`}
      onClick={onClick}
    >
      {text}
    </Link>
  )
}

export default LinkButton
