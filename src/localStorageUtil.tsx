import { Combatant } from "./types";

const INITIATIVE_KEY = "INITIATIVE";

export function saveCombatants(data: Combatant[]) {
	localStorage.setItem(INITIATIVE_KEY, JSON.stringify(data));
}

export function readCombatants(): Combatant[] {
	const raw = localStorage.getItem(INITIATIVE_KEY);
	return raw ? JSON.parse(raw) : []
}

export function resetCombatants() {
	localStorage.removeItem(INITIATIVE_KEY);
}
