import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import "./ModalDialog.scss";
const Background = ({ children }) => {
  return <div className="modal-fade">{children}</div>;
};
const ModalWindow = ({ className, children, refToAdd }) => {
  return (
    <div ref={refToAdd} className={`modal-background ${className}`}>
      {children}
    </div>
  );
};
const ModalDialog = ({ showModal, setShowModal, Content }) => {
  const node = useRef();
  const closeWindow = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    const listener = (event) => {
      if (!node.current || node.current.contains(event.target)) {
        return;
      }
      closeWindow();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [node, closeWindow]);

  return (
    <>
      {showModal ? (
        <Background>
          <ModalWindow className="modal-background" showModal={showModal} refToAdd={node}>
            {Content}
          </ModalWindow>
        </Background>
      ) : null}
    </>
  );
};

export default ModalDialog;
