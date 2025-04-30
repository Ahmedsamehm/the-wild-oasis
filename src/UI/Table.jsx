function Table({ columns, children }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table   table-auto table-sm md:table-md xl:table-lg text-xs sm:text-sm md:text-base text-center  ">
        <thead className="bg-neutral  max-w-full ">
          <tr className="">
            {columns.map((column, index) => (
              <th key={index} className={column.width||"w-1/6" }>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Table;
