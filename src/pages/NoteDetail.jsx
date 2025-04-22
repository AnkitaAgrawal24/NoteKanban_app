// src/pages/NoteDetail.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { NotesContext } from "../context/NotesContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, deleteNote } = useContext(NotesContext);

  const note = notes.find((n) => n.id === parseInt(id));

  if (!note) {
    return <p className="text-center text-red-600 mt-8">Note not found.</p>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
      navigate("/"); // go back home
    }
  };

  return (
    <div
      className={`min-h-screen p-8 ${note.bgColor} text-gray-800 transition-all duration-300`}
    >
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <p className="text-lg mb-4 whitespace-pre-wrap">{note.content}</p>
        <div className="flex gap-2 mb-6">
          {note.categories.map((cat, i) => (
            <span
              key={i}
              className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <FaEdit
            onClick={() => navigate(`/edit/${note.id}`)}
            className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl"
            title="Edit"
          />
          <RiDeleteBinFill
            onClick={handleDelete}
            className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
