import PreviousDataDisplay from "@components/PreviousDataDisplay/PreviousDataDisplay"

const UserDetails = ({ currentUserData, deleteUser }) => {
  return (
    <div className="min-w-[40%]">
      <h3 className="mb-[40px] font-[600] text-[20px] leading-[30px] ">
        Данные аккаунта
      </h3>
      <div className="flex flex-col gap-[20px]">
        <PreviousDataDisplay label={"Имя"} value={currentUserData.name} />
        {currentUserData.surname && (
          <PreviousDataDisplay
            label={"Фамилия"}
            value={currentUserData.surname}
          />
        )}
        <PreviousDataDisplay label={"Почта"} value={currentUserData.email} />
        <PreviousDataDisplay
          label={"Телефон номер"}
          value={currentUserData.phone}
        />
      </div>
    </div>
  )
}

export default UserDetails
