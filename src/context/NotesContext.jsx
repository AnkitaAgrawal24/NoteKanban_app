// src/context/NotesContext.jsx
import React, { createContext, useReducer, useState, useEffect } from "react";

export const NotesContext = createContext();

const initialState = [];

const noteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];
    case "DELETE_NOTE":
      return state.filter((note) => note.id !== action.payload);
    case "EDIT_NOTE":
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    case "SET_NOTES":
      return action.payload;
    case "UPDATE_COLOR": // to update note color
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, bgColor: action.payload.color }
          : note
      );
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(noteReducer, initialState);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-r from-blue-500 to-purple-600"
  );
  const [addOpen, setAddOpen] = useState(false);
  // Load from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notes"));
    if (stored) {
      dispatch({ type: "SET_NOTES", payload: stored });
    }
  }, []);

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => dispatch({ type: "ADD_NOTE", payload: note });
  const deleteNote = (id) => dispatch({ type: "DELETE_NOTE", payload: id });
  const editNote = (updatedNote) =>
    dispatch({ type: "EDIT_NOTE", payload: updatedNote });
  const updateNoteColor = (
    id,
    color //function to dispatch color update
  ) => dispatch({ type: "UPDATE_COLOR", payload: { id, color } });

  // export const NotesProvider = ({ children }) => {
  //   const [notes, setNotes] = useState([]);
  //   const [bgColor, setBgColor] = useState(
  //     "bg-gradient-to-r from-blue-500 to-purple-600"
  //   );
  //   const [addOpen, setAddOpen] = useState(false);

  //   const updateNote = (id, updatedNote) => {
  //     const updated = notes.map((note) => (note.id === id ? updatedNote : note));
  //     setNotes(updated);
  //     localStorage.setItem("notes", JSON.stringify(updated));
  //   };

  //   useEffect(() => {
  //     const stored = JSON.parse(localStorage.getItem("notes"));
  //     if (stored) setNotes(stored);
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem("notes", JSON.stringify(notes));
  //   }, [notes]);

  //   const addNote = (newNote) => setNotes((prev) => [...prev, newNote]);
  //   const deleteNote = (id) => {
  //     setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  //   };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        bgColor,
        setBgColor,
        addOpen,
        setAddOpen,
        updateNoteColor,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
