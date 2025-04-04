import { useEffect, useState} from "react";
import './App.css'
import AddCombatantForm from './components/AddCombatantForm'
import { saveCombatants, readCombatants } from './localStorageUtil';
import { Combatant } from './types'
import { v4 as uuidv4 } from "uuid";

function App() {
	const [combatants, setCombatants] = useState<Combatant[]>(readCombatants());

	useEffect(() => {
		saveCombatants(combatants);
	}, [combatants]);

	const addCombatant = (name: string, initiative: number) => {
		setCombatants((prev) => {
		const updated = [...prev, { id: uuidv4(), name, initiative }];
		return updated.sort((a, b) => b.initiative - a.initiative);
		});
	};

  return (
    <div className="app">
      <h1>Tabletop Initiative Tracker</h1>
			<AddCombatantForm 
				onAdd={addCombatant}
			/>
			<ul>
				{combatants.map((c) => (
					<li key={c.id}>
						{c.name} - {c.initiative}
					</li>
				))}
			</ul>
    </div>
  )
}

export default App
