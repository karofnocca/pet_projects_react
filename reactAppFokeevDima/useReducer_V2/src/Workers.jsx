import { useState } from "react";

function App() {
	const [notes, setNotes] = useState([1, 2, 3, 4, 5]);
	const [editNum, setEditNum] = useState(null);
	
	const result = notes.map((note, index) => {
		return <p key={index} onClick={() => startEdit(index)}>
			{note}
		</p>;
	});
	
	function startEdit(index) {
		setEditNum(index);
	}
	
	function changeItem(event) {
		setNotes([...notes.slice(0, editNum), event.target.value,...notes.slice(editNum + 1)]);
	}
	
	return <div>
		{result}
		<input value={notes[editNum]} onChange={changeItem} />
	</div>;
}
export default App;