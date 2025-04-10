import { useState } from 'react';
import { StatusCondition } from '../types';

type Props = {
  onAdd: (condition: StatusCondition) => void;
};

const COMMON_CONDITIONS = [
  { name: 'Blinded', color: '#333333' },
  { name: 'Clumsy', color: '#FF6B6B' },
  { name: 'Concealed', color: '#4ECDC4' },
  { name: 'Confused', color: '#FFD166' },
  { name: 'Controlled', color: '#06D6A0' },
  { name: 'Dazzled', color: '#FFD700' },
  { name: 'Deafened', color: '#118AB2' },
  { name: 'Doomed', color: '#073B4C' },
  { name: 'Drained', color: '#8B4513' },
  { name: 'Enfeebled', color: '#E63946' },
  { name: 'Fascinated', color: '#9B5DE5' },
  { name: 'Fatigued', color: '#6C757D' },
  { name: 'Off-Guard', color: '#6A040F' },
  { name: 'Fleeing', color: '#F72585' },
  { name: 'Frightened', color: '#7209B7' },
  { name: 'Grabbed', color: '#3A0CA3' },
  { name: 'Hidden', color: '#4CC9F0' },
  { name: 'Immobilized', color: '#4361EE' },
  { name: 'Invisible', color: '#4895EF' },
  { name: 'Paralyzed', color: '#560BAD' },
  { name: 'Persistent Damage', color: '#F72585' },
  { name: 'Petrified', color: '#3F37C9' },
  { name: 'Prone', color: '#4CC9F0' },
  { name: 'Quickened', color: '#4895EF' },
  { name: 'Restrained', color: '#3A0CA3' },
  { name: 'Sickened', color: '#7209B7' },
  { name: 'Slowed', color: '#560BAD' },
  { name: 'Stunned', color: '#480CA8' },
  { name: 'Stupefied', color: '#3F37C9' },
  { name: 'Unconscious', color: '#3A0CA3' },
  { name: 'Unnoticed', color: '#4895EF' },
  { name: 'Wounded', color: '#F72585' },
];

export default function StatusConditionForm({ onAdd }: Props) {
  const [customName, setCustomName] = useState('');
  const [customColor, setCustomColor] = useState('#000000');

  const handleAddCustom = () => {
    if (customName.trim()) {
      onAdd({ name: customName.trim(), color: customColor });
      setCustomName('');
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Add Status Condition</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {COMMON_CONDITIONS.map((condition) => (
          <button
            key={condition.name}
            onClick={() => onAdd(condition)}
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: condition.color,
              color: getContrastColor(condition.color),
            }}
          >
            {condition.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Custom condition"
          className="px-3 py-1 border rounded"
        />
        <input
          type="color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-10 h-10"
        />
        <button
          onClick={handleAddCustom}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          Add Custom
        </button>
      </div>
    </div>
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
