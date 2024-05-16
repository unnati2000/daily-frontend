"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { PiDotsSixVerticalLight } from "react-icons/pi";
import { CgEye } from "react-icons/cg";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

import { closestCenter } from "@dnd-kit/core";

import {
  useSensor,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";

import SortableRow from "@/components/table/Row";
import DataTableColumn from "@/components/table/Column";

const initialRows = [
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
  {
    id: 3,
    name: "Unnati Bamania",
    email: "unnatibamania8@gmail.com",
    rollNo: 3,
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
  const [rows, setRows] = useState(initialRows);

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

  const handleColumnDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setVisibleColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRowDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setRows((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const [columnHover, setColumnHover] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-14">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleColumnDragEnd}
        sensors={sensors}
      >
        <table className="w-full" role="table">
          <thead
            className="bg-zinc-900"
            onMouseEnter={() => setColumnHover(true)}
            onMouseLeave={() => setColumnHover(false)}
          >
            <SortableContext
              items={visibleColumns}
              strategy={horizontalListSortingStrategy}
            >
              <tr role="row">
                {visibleColumns.map((column: any, index: any) => (
                  <DataTableColumn
                    key={column.id}
                    column={column}
                    index={index}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    rows={rows}
                    isFirst={index === 0}
                    isLast={index === visibleColumns.length - 1}
                    handleHide={handleHide}
                  />
                ))}
              </tr>
            </SortableContext>
          </thead>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleRowDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={rows}
              strategy={verticalListSortingStrategy}
            >
              <tbody role="rowgroup">
                {rows.map((row: any) => (
                  <SortableRow
                    key={row.id}
                    row={row}
                    visibleColumns={visibleColumns}
                    handleSelect={handleSelect}
                    selectedData={selectedData}
                    columnHover={columnHover}
                  />
                ))}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
      </DndContext>
    </div>
  );
};

export default Table;
