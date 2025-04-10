import { useState } from 'react';

type Props = {
  onAdd: (name: string, initiative: number) => void;
};

export default function AddCombatantForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), initiative);
    setName('');
    setInitiative(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Add New Combatant
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">
            Character Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter character name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-1p-ignore
            autoFocus={true}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="initiative"
            className="mb-1 text-sm font-medium"
          >
            Initiative Roll
          </label>
          <input
            id="initiative"
            type="number"
            placeholder="Enter initiative value"
            value={initiative}
            onChange={(e) => setInitiative(Number(e.target.value))}
            className="border border-gray-600 bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-1p-ignore
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          Add Combatant
        </button>
      </div>
    </form>
  );
}
