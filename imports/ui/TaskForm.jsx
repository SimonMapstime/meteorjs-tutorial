import React, {useState} from "react";

const TaskForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;

        await Meteor.callAsync("tasks.insert", {
            text: text.trim(0),
            createdAt: new Date(),
        })
        setText("")
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Type to add new tasks"
            value={text}
            onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add task</button>
        </form>
    )
}

export default TaskForm;