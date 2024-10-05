import { Link } from "react-router-dom"

const MobileMenuNavItem = ({ item, closeMobileNav}) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:text-red-400" onClick={closeMobileNav}>
      {item.icon}
      <Link to={item.to} >
        {item.label}
      </Link>
    </div>
  )
}

export default MobileMenuNavItem
