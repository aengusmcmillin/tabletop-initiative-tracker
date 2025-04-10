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
      className="border border-gray-700 p-4 rounded-lg bg-gray-700 shadow-md cursor-move hover:bg-gray-600 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg">{props.name}</span>
            <span className="text-sm text-gray-400">
              Initiative: {props.initiative}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(props.statusConditions || []).map((status, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-bold cursor-pointer"
                style={{
                  backgroundColor: status.color,
                  color: getContrastColor(status.color),
                }}
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
          className="ml-2 px-3 py-1 bg-gray-800 hover:bg-gray-900 rounded text-sm no-drag transition-colors duration-200"
          data-no-drag="true"
        >
          {showStatusForm ? 'Hide Status' : 'Add Status'}
        </button>
      </div>
      {showStatusForm && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="no-drag mt-3"
        >
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

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Remove the # if present
  const color = hexColor.replace('#', '');

  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
