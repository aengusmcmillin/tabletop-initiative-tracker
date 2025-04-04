import { useEffect, useState} from "react";
import './App.css'
import AddCombatantForm from './components/AddCombatantForm'
import { saveCombatants, readCombatants, resetCombatants } from './localStorageUtil';
import { Combatant } from './types'
import { v4 as uuidv4 } from "uuid";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

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

	const resetData = () => {
		resetCombatants();
		setCombatants([]);
	}


  return (
    <div className="app">
      <h1>Tabletop Initiative Tracker</h1>
			<AddCombatantForm 
				onAdd={addCombatant}
			/>
    <DndContext 
				onDragEnd={handleDragEnd}>
			<SortableContext 
				items={combatants.map((c) => c.id)}
				strategy={verticalListSortingStrategy}
				>
<ul>
					{combatants.map((c) => (
						<SortableItem key={c.id} id={c.id} name={c.name} initiative={c.initiative} />
				))}
</ul>
			</SortableContext>
		</DndContext>
			<button onClick={resetData}>Reset Data</button>
    </div>
  )

	function handleDragEnd(event: any) {
			const {active, over} = event;

			
			if (active.id !== over.id) {
					const oldIndex = combatants.findIndex((c) => c.id == active.id);
					const newIndex = combatants.findIndex((c) => c.id == over.id);
					const result =  arrayMove(combatants, oldIndex, newIndex);
setCombatants(result);
			}
	}
}


export default App
