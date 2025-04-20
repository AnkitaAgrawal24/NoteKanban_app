import React, { useEffect, useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { getStoredCategories, saveCategoriesToStorage } from "../utils/Storage";
import { NotesContext } from "../context/NotesContext";

const AddNoteModal = () => {
  const { addOpen, setAddOpen, addNote } = useContext(NotesContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  //   const categoryOptions = [
  //     { vallue: "Shopping", label: "Shopping" },
  //     { value: "Work", label: "Work" },
  //     { value: "Personal", label: "Personal" },
  //     { value: "Reminder", label: "Reminder" },
  //   ];

  useEffect(() => {
    const stored = getStoredCategories();
    if (stored.length) {
      setCategoriesOptions(stored);
    } else {
      const defaultOptions = [
        { value: "Shopping", label: "Shopping" },
        { value: "Work", label: "Work" },
        { value: "Personal", label: "Personal" },
        { value: "Reminder", label: "Reminder" },
      ];
      setCategoriesOptions(defaultOptions);
      saveCategoriesToStorage(defaultOptions);
    }
  }, []);

  const handleCreateCategory = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    const updated = [...categoriesOptions, newOption];
    setCategoriesOptions(updated);
    setCategories((prev) => [...prev, newOption]);
    saveCategoriesToStorage(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || categories.length === 0) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      categories: categories.map((cat) => cat.value),
    };
    addNote(newNote);
    setAddOpen(false);
    // reset fields
    setTitle("");
    setContent("");
    setCategories([]);
  };

  if (!addOpen) return null;

  return (
    <>
      <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm backdrop-brightness-75  flex items-center justify-center z-50">
        <div className=" p-6 rounded-2xl shadow-2xl w-96 bg-white">
          <h2 className="text-xl font-bold mb-4">Add New Note</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 mb-4 rounded-2xl text-lg"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border px-4 py-2 mb-4 rounded-2xl text-lg"
            />

            {/* Multi-select with create option */}
            <CreatableSelect
              isMulti
              options={categoriesOptions}
              value={categories}
              onChange={setCategories}
              onCreateOption={handleCreateCategory}
              placeholder="Select or create categories"
              className="py-2 mb-4 rounded-2xl text-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-2xl"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-2xl"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNoteModal;
