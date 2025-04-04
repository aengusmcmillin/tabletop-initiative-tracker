import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
	id: string,
	name: string,
	initiative: number,
};

export function SortableItem(props: Props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({id: props.id});

const style = {
transform: CSS.Transform.toString(transform),
transition,
};

return (
<li ref={setNodeRef} style={style} {...attributes} {...listeners}
className="border p-3 my-3 rounded-xl bg-black italic shadow cursor-move">
{props.name} - {props.initiative}
</li>
)
}
