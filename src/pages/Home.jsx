import React, { useContext, useState } from "react";
import NoteList from "../components/NoteList";
import NoteBoard from "../components/NoteBoard";
import AddNoteModal from "../components/AddNoteModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { NotesContext } from "../context/NotesContext";
import { Navbar } from "../components/Navbar";

const Home = () => {
  const { notes, addOpen, setAddOpen, editNote } = useContext(NotesContext);
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const noteId = parseInt(draggableId.replace("note-", ""));
    const draggedNote = notes.find((n) => n.id === noteId);

    if (!draggedNote) return;

    // Remove old kanban categories and add new one
    const updatedCategories = draggedNote.categories.filter(
      (cat) => !["Important", "Urgent", "General"].includes(cat)
    );
    updatedCategories.push(destination.droppableId);

    const updatedNote = { ...draggedNote, categories: updatedCategories };
    editNote(updatedNote);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Left Side - Note List */}
          <div className="w-1/3 border-r p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">All Notes</h1>
              <button
                onClick={() => setAddOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl"
              >
                + Add Note
              </button>
            </div>
            <NoteList />
          </div>

          {/* Right Side - Kanban */}
          <div className="w-2/3 p-4 overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">NoteBoard</h1>
            <NoteBoard />
          </div>
        </DragDropContext>

        {addOpen && <AddNoteModal />}
      </div>
    </>
  );
};

export default Home;
