export const getStoredCategories = () => {
  const stored = localStorage.getItem("note-categories");
  return stored ? JSON.parse(stored) : [];
};

export const saveCategoriesToStorage = (categories) => {
  localStorage.setItem("note-categories", JSON.stringify(categories));
};
