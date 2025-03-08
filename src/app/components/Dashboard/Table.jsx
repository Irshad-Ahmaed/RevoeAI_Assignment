import formatDate from "@/app/utils/formatDate";

export default function Table({ data, columns }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-4 py-2 border">
                                {column.name} | {`${column.date ? formatDate(column.date) : column.value}`}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.length != 0 &&
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-2 border">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                }
            </table>
            {
                data.length === 0 && <p className="text-center mt-2 font-semibold text-xl text-gray-500">No Data Available on the sheet</p>
            }
        </div>
    );
}