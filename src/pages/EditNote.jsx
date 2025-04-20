import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NotesContext } from "../context/NotesContext";
import { getStoredCategories, saveCategoriesToStorage } from "../utils/Storage";
import CreatableSelect from "react-select/creatable";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, editNote } = useContext(NotesContext);

  const noteToEdit = notes.find((note) => note.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  // Load categories from localStorage on mount
  useEffect(() => {
    const stored = getStoredCategories();
    if (stored.length) {
      setCategoriesOptions(stored);
    }
  }, []);

  // Load note content
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategories(
        noteToEdit.categories.map((cat) => ({ value: cat, label: cat }))
      );
    }
  }, [noteToEdit]);

  const handleCreateCategory = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    const updated = [...categoriesOptions, newOption];
    setCategoriesOptions(updated);
    setCategories((prev) => [...prev, newOption]);
    saveCategoriesToStorage(updated);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedNote = {
      ...noteToEdit,
      title,
      content,
      categories: categories.map((cat) => cat.value),
    };
    editNote(updatedNote);
    navigate("/");
  };

  if (!noteToEdit) return <p className="text-center mt-8">Note not found</p>;

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Note</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 mb-4 rounded text-lg"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-4 py-2 mb-4 rounded text-lg"
          />

          <CreatableSelect
            isMulti
            options={categoriesOptions}
            value={categories}
            onChange={setCategories}
            onCreateOption={handleCreateCategory}
            placeholder="Select or create categories"
            className="mb-4"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNote;
