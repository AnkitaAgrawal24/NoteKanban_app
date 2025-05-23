import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const { notes, deleteNote, searchButton } = useContext(NotesContext);
  const navigate = useNavigate();

  // Only show notes without "Important", "Urgent", "General"
  // const uncategorizedNotes = notes.filter(
  //   (note) =>
  //     (!note.categories.includes("Important") &&
  //       !note.categories.includes("Urgent") &&
  //       !note.categories.includes("General") &&
  //       note.title.toLowerCase().includes(searchButton.toLowerCase())) ||
  //     note.content.toLowerCase().includes(searchButton.toLowerCase())
  // );

  const uncategorizedNotes = notes.filter(
    (note) =>
      !["Important", "Urgent", "General"].some((cat) =>
        note.categories.includes(cat)
      ) &&
      (note.title.toLowerCase().includes(searchButton.toLowerCase()) ||
        note.content.toLowerCase().includes(searchButton.toLowerCase()))
  );

  return (
    <Droppable droppableId="note-list" isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {uncategorizedNotes.map((note, index) => (
            <Draggable
              key={note.id}
              draggableId={`note-${note.id}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <NoteCard
                    note={note}
                    onEdit={() => navigate(`/edit/${note.id}`)}
                    onDelete={() => deleteNote(note.id)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default NoteList;
