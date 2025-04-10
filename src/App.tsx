import { useEffect, useState } from 'react';
import './App.css';
import AddCombatantForm from './components/AddCombatantForm';
import {
  saveCombatants,
  readCombatants,
  resetCombatants,
} from './localStorageUtil';
import { Combatant, StatusCondition } from './types';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

function App() {
  const [combatants, setCombatants] = useState<Combatant[]>(
    readCombatants()
  );

  // Configure sensors with distance-based activation
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Require the touch to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
      delay: 250, // Add a small delay for touch devices
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    saveCombatants(combatants);
  }, [combatants]);

  const addCombatant = (name: string, initiative: number) => {
    setCombatants((prev) => {
      const updated = [
        ...prev,
        {
          id: uuidv4(),
          name,
          initiative,
          statusConditions: [],
        },
      ];
      return updated.sort((a, b) => b.initiative - a.initiative);
    });
  };

  const addStatusCondition = (
    combatantId: string,
    condition: StatusCondition
  ) => {
    setCombatants((prev) =>
      prev.map((combatant) => {
        if (combatant.id === combatantId) {
          return {
            ...combatant,
            statusConditions: [
              ...combatant.statusConditions,
              condition,
            ],
          };
        }
        return combatant;
      })
    );
  };

  const removeStatusCondition = (
    combatantId: string,
    conditionIndex: number
  ) => {
    setCombatants((prev) =>
      prev.map((combatant) => {
        if (combatant.id === combatantId) {
          return {
            ...combatant,
            statusConditions: combatant.statusConditions.filter(
              (_, index) => index !== conditionIndex
            ),
          };
        }
        return combatant;
      })
    );
  };

  const resetData = () => {
    resetCombatants();
    setCombatants([]);
  };

  return (
    <div className="app">
      <h1>Tabletop Initiative Tracker</h1>
      <AddCombatantForm onAdd={addCombatant} />
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext
          items={combatants.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {combatants.map((c) => (
              <SortableItem
                key={c.id}
                id={c.id}
                name={c.name}
                initiative={c.initiative}
                statusConditions={c.statusConditions}
                onAddStatus={(condition) =>
                  addStatusCondition(c.id, condition)
                }
                onRemoveStatus={(index) =>
                  removeStatusCondition(c.id, index)
                }
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button onClick={resetData}>Reset Data</button>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = combatants.findIndex(
        (c) => c.id === active.id
      );
      const newIndex = combatants.findIndex((c) => c.id === over.id);
      const result = arrayMove(combatants, oldIndex, newIndex);
      setCombatants(result);
    }
  }
}

export default App;
