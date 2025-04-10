import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { StatusCondition } from './types';
import { useState } from 'react';
import StatusConditionForm from './components/StatusConditionForm';

type Props = {
  id: string;
  name: string;
  initiative: number;
  statusConditions?: StatusCondition[];
  onAddStatus?: (condition: StatusCondition) => void;
  onRemoveStatus?: (index: number) => void;
};

export function SortableItem(props: Props) {
  const [showStatusForm, setShowStatusForm] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-3 my-3 rounded-xl bg-black italic shadow cursor-move"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            {props.name} - {props.initiative}
          </span>
          <div className="flex gap-1">
            {(props.statusConditions || []).map((status, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-bold cursor-pointer"
                style={{ backgroundColor: status.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onRemoveStatus?.(index);
                }}
              >
                {status.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowStatusForm(!showStatusForm);
          }}
          className="ml-2 px-2 py-1 bg-gray-700 rounded text-sm no-drag"
          data-no-drag="true"
        >
          {showStatusForm ? 'Hide' : 'Add Status'}
        </button>
      </div>
      {showStatusForm && (
        <div onClick={(e) => e.stopPropagation()} className="no-drag">
          <StatusConditionForm
            onAdd={(condition) => {
              props.onAddStatus?.(condition);
              setShowStatusForm(false);
            }}
          />
        </div>
      )}
    </li>
  );
}
