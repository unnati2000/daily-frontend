import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@mantine/core";

import { motion } from "framer-motion";

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
      <motion.div
        initial={{
          x: 10,
          opacity: 0,
        }}
        animate={{
          x: 10,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{
          x: 10,
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        }}
        className="flex gap-2"
      >
        {index === 0 ? (
          <div className="flex items-center gap-2">
            <PiDotsSixVerticalLight
              size={20}
              {...rowAttributes}
              {...rowListeners}
            />

            <Checkbox
              onChange={() => {
                handleSelect(row);
              }}
              checked={
                selectedData.filter((item: any) => item.id === row.id)?.length
              }
            />

            {column.row({ row })}
          </div>
        ) : (
          column.row({ row })
        )}
      </motion.div>
    </td>
  );
};

export default DataTableCell;
