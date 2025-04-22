import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router";
import { NotesContext } from "../context/NotesContext";
import { toast } from "react-toastify";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();
  const { deleteNote, updateNoteColor } = useContext(NotesContext);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    note.bgColor || "bg-white"
  ); // Initialize with existing or white

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete ?")) {
      deleteNote(note.id);
      toast.success("Note deleted successfully!");
    }
  };
  const handleColorChange = (color) => {
    setSelectedColor(color);
    updateNoteColor(note.id, color);
    setShowColorPalette(false);
  };
  const colors = [
    "bg-white",
    "bg-yellow-400",
    "bg-green-400",
    "bg-red-300",
    "bg-blue-400",
  ];

  // const notify = () => toast("Wow so easy!");

  if (!note) return null;
  return (
    <>
      <div
        onClick={() => navigate(`/note/${note.id}`)}
        className="cursor-pointer"
      >
        {/* the full card design */}
      </div>
      {/* <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition w-full mt-4 "> */}
      <div
        className={`rounded-xl shadow p-4 hover:shadow-lg transition w-full mt-4  ${selectedColor}`}
      >
        <h2 className="text-gray-800 text-xl font-bold mb-2">{note.title}</h2>
        <p className="text-gray-700 text-lg col-span-full italic">
          {note.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {note.categories.map((cat, i) => (
            <span
              key={i}
              className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex mt-4 gap-2 justify-end items-center">
          {/* <div
            onClick={() => setShowColorPalette(!showColorPalette)}
            // className="w-6 h-6 rounded-full border border-gray-400 cursor-pointer"
            style={{ backgroundColor: selectedColor.split("-")[1] }} // Basic color preview
          ></div>
          {showColorPalette && (
            <div className="absolute z-10 shadow-md rounded-md border border-gray-200 mt-1">
              <div className="grid grid-cols-4 gap-1 p-2 bg-white">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer ${color} shadow-sm border border-gray-300`}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
            </div>
          )} */}

          <div className="relative">
            <FaCircleHalfStroke
              className="cursor-pointer"
              onClick={() => setShowColorPalette(!showColorPalette)}
              title="change background"
            />
            {showColorPalette && (
              <div className="absolute right-0 mt-2 flex gap-4 bg-white p-2 rounded shadow z-50">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-6 h-6 rounded-full cursor-pointer border ${color}`}
                  />
                ))}
              </div>
            )}
          </div>

          <FaEdit
            onClick={() => navigate(`/edit/${note.id}`)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          />
          <RiDeleteBinFill
            onClick={handleDelete}
            className="cursor-pointer text-red-400 hover:text-red-600"
          />
        </div>
      </div>
    </>
  );
};

export default NoteCard;
