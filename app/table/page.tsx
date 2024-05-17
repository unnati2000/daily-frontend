"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { AnimatePresence } from "framer-motion";

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
  {
    id: 4,
    name: "Alice Smith",
    email: "alice@example.com",
    rollNo: 4,
  },
  {
    id: 5,
    name: "Bob Johnson",
    email: "bob@example.com",
    rollNo: 5,
  },
  {
    id: 6,
    name: "Charlie Brown",
    email: "charlie@example.com",
    rollNo: 6,
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david@example.com",
    rollNo: 7,
  },
  {
    id: 8,
    name: "Eva Green",
    email: "eva@example.com",
    rollNo: 8,
  },
  {
    id: 9,
    name: "Frank White",
    email: "frank@example.com",
    rollNo: 9,
  },
  {
    id: 10,
    name: "Grace Black",
    email: "grace@example.com",
    rollNo: 10,
  },
  {
    id: 11,
    name: "Hannah Blue",
    email: "hannah@example.com",
    rollNo: 11,
  },
  {
    id: 12,
    name: "Ian Red",
    email: "ian@example.com",
    rollNo: 12,
  },
  {
    id: 13,
    name: "Jack Green",
    email: "jack@example.com",
    rollNo: 13,
  },
  {
    id: 14,
    name: "Jack Green",
    email: "jack@example.com",
    rollNo: 14,
  },
  {
    id: 15,
    name: "Jack Green",
    email: "jack@example.com",
    rollNo: 15,
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
    if (selectedData.find((item) => item.id === row.id)) {
      setSelectedData((prev) => prev.filter((item) => item.id !== row.id));
    } else {
      setSelectedData((prev) => [...prev, row]);
    }
  };

  const handleHide = (column: any) => {
    if (visibleColumns.length === 1) return;

    if (visibleColumns.find((item) => item.id === column.id)) {
      setVisibleColumns((prev: any) =>
        prev.filter((item: any) => item.id !== column.id)
      );
    } else {
      setVisibleColumns((prev: any) => [...prev, column]);
    }
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
    <div className="overflow-hidden m-8 border w-full flex flex-col items-start relative justify-start">
      <AnimatePresence>
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
                      columns={tableColumns}
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
                items={rows.map((row) => row.id)}
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

        <div className="absolute w-3/4 left-1/2 -translate-x-1/2 bottom-14 p-3 bg-zinc-800 rounded-lg backdrop:blur-4">
          Table actions
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Table;
