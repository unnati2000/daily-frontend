import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Menu } from "@mantine/core";

import { CgEye } from "react-icons/cg";
import { TbTableColumn } from "react-icons/tb";

import { PiDotsSixVerticalLight } from "react-icons/pi";

const DataTableColumn = ({
  column,
  selectedData,
  setSelectedData,
  rows,
  handleHide,
  isFirst,
  isLast,
  columns,
}: any) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: column.id,
    });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th
      className={
        "p-4" +
        (isFirst ? " rounded-tl-xl" : "") +
        (isLast ? " rounded-tr-xl" : "")
      }
      tabIndex={column.id}
      role="columnheader"
      key={column.id}
      ref={setNodeRef}
      style={style}
    >
      <div className={"flex items-center justify-between gap-4 color-white"}>
        <div className="flex items-center gap-2">
          <PiDotsSixVerticalLight size={20} {...attributes} {...listeners} />
          {isFirst === 0 ? (
            <div className="flex gap-2">
              {selectedData.length > 0 ? (
                <input
                  type="checkbox"
                  checked={rows.length === selectedData.length}
                  onChange={() => {
                    if (selectedData.length === rows.length) {
                      setSelectedData([]);
                    } else {
                      setSelectedData(rows);
                    }
                  }}
                />
              ) : null}
              {column.label}
            </div>
          ) : (
            column.label
          )}
        </div>

        {isLast ? (
          <Menu width={"160px"}>
            <Menu.Target>
              <button>
                <TbTableColumn size={24} />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              {columns.map((column: any) => (
                <Menu.Item
                  key={column.id}
                  onClick={() => handleHide(column)}
                  rightSection={<CgEye size={16} />}
                >
                  {column.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ) : (
          <div className="h-8 w-0.5 cursor-col-resize border" />
        )}
      </div>
    </th>
  );
};

export default DataTableColumn;
