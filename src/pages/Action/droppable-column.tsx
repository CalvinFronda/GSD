import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DroppableColumnProps {
  id: string;
  items: string[];
  children: ReactNode;
}

export function DroppableColumn({ id, items, children }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 flex-col gap-3 rounded-lg border p-3 ${
        isOver ? "bg-muted/60 ring-2 ring-primary/20" : "bg-muted/40"
      }`}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
}
