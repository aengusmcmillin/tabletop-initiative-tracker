import { useState } from "react";

type Props = {
	onAdd: (name: string, initiative: number) => void;
};

export default function AddCombatantForm({ onAdd }: Props) {
	const [name, setName] = useState("");
	const [initiative, setInitiative] = useState<number>(0);

	const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), initiative);
    setName("");
    setInitiative(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="number"
        placeholder="Initiative"
        value={initiative}
        onChange={(e) => setInitiative(Number(e.target.value))}
        className="border p-1 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
        Add Combatant
      </button>
    </form>
	)
}

