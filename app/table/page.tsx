"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { PiDotsSixVerticalLight } from "react-icons/pi";
import { CgEye } from "react-icons/cg";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

import { closestCenter } from "@dnd-kit/core";

import {
  useSensor,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    rollNo: 1,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    rollNo: 2,
  },
];

const tableColumns = [
  {
    id: 1,
    label: "Name",
    row: ({ row }: { row: any }) => <p>{row.name}</p>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 2,
    label: "Email",
    row: ({ row }: { row: any }) => <p>{row.email}</p>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 3,
    label: "Roll no",
    row: ({ row }: { row: any }) => <p>{row.rollNo}</p>,
    enableSorting: false,
    enableHiding: true,
  },
];

const Table = () => {
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const [visibleColumns, setVisibleColumns] = useState(tableColumns);

  const handleSelect = (row: any) => {
    if (selectedData.includes(row)) {
      setSelectedData((prev) => prev.filter((item) => item.id !== row.id));
    } else {
      setSelectedData((prev) => [...prev, row]);
    }
  };

  const handleHide = (column: any) => {
    setVisibleColumns((prev: any) =>
      prev.filter((item: any) => item.id !== column.id)
    );
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={() => {
          console.log("yess");
        }}
        // sensors={sensors}
      >
        <table className="border" role="table">
          <thead className="border">
            <tr role="row">
              <SortableContext
                items={visibleColumns}
                strategy={horizontalListSortingStrategy}
              >
                {visibleColumns.map((column: any, index: any) => (
                  <DataTableColumn
                    key={column.id}
                    column={column}
                    index={index}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    rows={rows}
                    handleHide={handleHide}
                  />
                ))}
              </SortableContext>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {rows.map((row: any) => (
              <tr role="row" key={row.id}>
                {visibleColumns.map((column: any, index: any) => (
                  <SortableContext
                    key={column.id}
                    items={visibleColumns}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DataTableCell
                      column={column}
                      index={index}
                      handleSelect={handleSelect}
                      selectedData={selectedData}
                      row={row}
                    />
                  </SortableContext>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};

const DataTableColumn = ({
  column,
  index,
  selectedData,
  setSelectedData,
  rows,
  handleHide,
}: any) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: column.id,
    });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    // width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <>
      <th
        className="p-4 border"
        tabIndex={column.id}
        role="columnheader"
        key={column.id}
        ref={setNodeRef}
        style={style}
      >
        <div className="flex items-center justify-between gap-4 color-white">
          <PiDotsSixVerticalLight size={20} {...attributes} {...listeners} />

          {index === 0 ? (
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

          {column.enableHiding && <CgEye size={16} />}
        </div>
      </th>
    </>
  );
};

const DataTableCell = ({
  column,
  index,
  handleSelect,
  selectedData,
  row,
}: any) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: column.id,
  });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    // width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };
  return (
    <td
      className="p-3 border"
      role="cell"
      key={column.id}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex gap-2">
        {index === 0 ? (
          <input
            type="checkbox"
            checked={selectedData.includes(row)}
            onChange={() => handleSelect(row)}
          />
        ) : null}

        {column.row({ row })}
      </div>
    </td>
  );
};

export default Table;

