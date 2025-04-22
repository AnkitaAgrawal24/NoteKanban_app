import React, { useContext } from "react";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { FaSearch } from "react-icons/fa";
// import AddNoteModal from "./AddNoteModal";

export const Navbar = () => {
  const { setBgColor, bgColor, setAddOpen } = useContext(NotesContext);
  const [showPalette, setShowPalette] = useState(false);
  const { searchButton, setSearchButton } = useContext(NotesContext);
  //   const palettes = [
  //     "bg-linear-gradient(to bottom, #0d1282, #0a6ebd)",
  //     "bg-blue-900",
  //     "bg-green-700",
  //     "bg-purple-700",
  //     "bg-yellow-600",
  //     "bg-gray-900",
  //     "bg-red-700",
  //   ];
  const palettes = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-cyan-400 to-teal-500",
  ];

  // Add modal for add new note

  // const [addOpen, setAddOpen] = useState(false);

  return (
    <div
      className={`flex ${bgColor} text-white w-full cursor-pointer items-center justify-between shadow px-6 py-4 `}
    >
      <div className="text-3xl font-bold ">Notes</div>
      <div className="flex justify-end p-4">
        <input
          type="text"
          placeholder="Search"
          value={searchButton}
          onChange={(e) => setSearchButton(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white text-black"
        />
        <button className="mx-2">
          <FaSearch className="text-white" />
        </button>
      </div>

      <div className="flex items-center gap-4 relative ">
        <div className="relative">
          <FaCircleHalfStroke
            className="text-3xl"
            onClick={() => setShowPalette(!showPalette)}
            title="change background"
          />
          {showPalette && (
            <div className="absolute right-0 mt-2 flex gap-4 bg-white p-2 rounded shadow z-50">
              {palettes.map((color, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setBgColor(color);
                    setShowPalette(false);
                  }}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${color}`}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className="text-white text-3xl mx-4"
          onClick={() => setAddOpen(true)}
        >
          <FaPlusCircle />
          {/* <AddNoteModal add={addOpen} changeAdd={setAddOpen} /> */}
        </div>
      </div>
    </div>
  );
};
