import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { PiDotsSixVerticalLight } from "react-icons/pi";

const DataTableCell = ({
  column,
  index,
  handleSelect,
  selectedData,
  row,
  rowAttributes,
  rowListeners,
}: any) => {
  const { isDragging, transform, setNodeRef } = useSortable({
    id: row.id,
  });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td className="p-3" role="cell" key={column.id}>
      <div className="flex gap-2">
        {index === 0 ? (
          <div
            className="flex items-center gap-2"
            {...rowAttributes}
            {...rowListeners}
          >
            <PiDotsSixVerticalLight size={20} />
            <input
              type="checkbox"
              checked={selectedData.includes(row)}
              onChange={() => handleSelect(row)}
            />
            {column.row({ row })}
          </div>
        ) : (
          column.row({ row })
        )}
      </div>
    </td>
  );
};

export default DataTableCell;
