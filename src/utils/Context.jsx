import { useState, createContext } from "react";

const ModalContext = createContext();

const ModalContextProvider = ({children}) =>{
    const [showModal,setShowModal] = useState(false);
    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
          {children}
        </ModalContext.Provider>
      );
}

export { ModalContext, ModalContextProvider };