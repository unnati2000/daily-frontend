import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DataTableCell from "./Cell";

const SortableRow = ({
  row,
  visibleColumns,
  handleSelect,
  selectedData,
  columnHover,
}: any) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: row.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <tr role="row" key={row.id} ref={setNodeRef} style={style}>
      {visibleColumns.map((column: any, index: any) => (
        <DataTableCell
          key={column.id}
          column={column}
          index={index}
          rowAttributes={attributes}
          rowListeners={listeners}
          handleSelect={handleSelect}
          selectedData={selectedData}
          row={row}
          columnHover={columnHover}
        />
      ))}
    </tr>
  );
};

export default SortableRow;

