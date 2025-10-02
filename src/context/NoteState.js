import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "https://inotebook-backend-pq5x.onrender.com";

    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (Array.isArray(json)) {
            setNotes(json);
        } else {
            console.error("Expected array, got:", json);
        }
    };

    // Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // Delete a note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        await response.json();

        const updatedNotes = notes.map(note =>
            note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(updatedNotes);
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, searchQuery, setSearchQuery }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
