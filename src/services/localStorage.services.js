export const getItem = (filed) => {
  try {
    const data = localStorage.getItem(filed);
    return JSON.parse(data)
  } catch (error) {
    console.error(error);
    return undefined
  }
};

export const setItem = (filed, data) => {
  try {
    localStorage.removeItem(filed);
    localStorage.setItem(filed, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = (field) => {
  try {
    return localStorage.removeItem(field);
  } catch (error) {
    console.error(error);
    return null;
  }
};
