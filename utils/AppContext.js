import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [reloadData, setReloadData] = useState(false);
  const [removeCheckboxVisible, setRemoveCheckboxVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        reloadData,
        setReloadData,
        removeCheckboxVisible,
        setRemoveCheckboxVisible,
        isAddModalVisible,
        setAddModalVisible,
        editMode,
        setEditMode,
        selectedItem,
        setSelectedItem,
        infoModalVisible,
        setInfoModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;

export const useAppContext = () => useContext(AppContext);
