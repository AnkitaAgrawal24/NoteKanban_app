import React, { useContext } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router";
import NoteCard from "./NoteCard";

const columns = ["Important", "Urgent", "General"];

const NoteBoard = () => {
  const { notes, deleteNote } = useContext(NotesContext);
  const navigate = useNavigate();

  const groupedNotes = columns.reduce((acc, col) => {
    acc[col] = notes.filter((note) => note.categories.includes(col));
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column) => (
        <Droppable key={column} droppableId={column}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-gray-100 p-4 rounded-xl min-h-[300px]"
            >
              <h3 className="font-semibold mb-2">{column}</h3>
              {groupedNotes[column].map((note, index) => (
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
                      // className="p-2 "
                    >
                      {/* <h4 className="font-bold">{note.title}</h4>
                      <p className="text-sm mb-2">
                        {note.content.length > 100
                          ? note.content.slice(0, 100) + "..."
                          : note.content}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/edit/${note.id}`)}
                          className="text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div> */}
                      <NoteCard note={note} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default NoteBoard;
