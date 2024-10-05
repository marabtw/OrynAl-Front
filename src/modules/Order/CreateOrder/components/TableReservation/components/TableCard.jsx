import Button from "@ui/Button/Button"

const TableCard = ({ tableData, getTableId, selectedTableId }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-between
			min-h-[362px] w-full px-[20px] py-[20px] max-lg:min-h-[250px] max-lg:p-[15px] max-lg:max-w-[200px] max-sm:p-[10px]
			font-poppins 
			border-4 border-[#8AB8FF] rounded-[31px] max-md:border-3 max-md:rounded-[20px]"
    >
      <div className="w-[180px] aspect-square rounded-full flex justify-center overflow-hidden max-lg:h-[100px]">
        {tableData.photo ? (
          <img
            src={tableData.photo.route}
            alt="icon"
            className="h-full aspect-square rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 rounded-full"></div>
        )}
      </div>
      <h3 className="font-[600] text-[20px] leading-[30px] max-md:text-[16px] max-md:leading-[18px]">
        {tableData.name}
      </h3>
      <div
        className="relative flex justify-between items-center w-full max-md:flex-col
				text-[15px] leading-[22.5px] max-lg:text-[12px] max-md:leading-[18px]"
      >
        <h3>{tableData.type}</h3>
        <div className="w-[10px] aspect-square bg-[#C4C4C4] rounded-full max-md:hidden"></div>
        <h3>Вместимость: {tableData.capacity}</h3>
      </div>
      {selectedTableId === tableData.id ? (
        <Button
          text="Выбрано"
          backgroundColor={"#4ade80"}
          spacingClass={"px-[10px] py-[10px]"}
          textStyles={
            "text-[18px] font-[600] leading-[26px] max-lg:text-[14px] max-lg:leading-[18px]"
          }
          rounded={"rounded-[10px]"}
          onClick={() => {
            getTableId(-1)
          }}
        />
      ) : (
        <Button
          text="Выбрать"
          gradient={true}
          spacingClass={"px-[10px] py-[10px]"}
          textStyles={
            "text-[18px] font-[600] leading-[26px] max-lg:text-[14px] max-lg:leading-[18px]"
          }
          rounded={"rounded-[10px]"}
          onClick={() => {
            if (selectedTableId !== tableData.id) getTableId(tableData.id)
          }}
        />
      )}
      <div
        className={`absolute right-[20px] top-[20px] w-[20px] aspect-square rounded-full ${
          tableData.status ? "bg-[#31A24C]" : "bg-red-700"
        } max-sm:top-[5px] max-sm:right-[5px] max-sm:w-[15px]`}
      ></div>
    </div>
  )
}

export default TableCard
