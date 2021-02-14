import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ModalDialog.scss";
const Background = ({ children, className }) => {
  return <div className={`modal-fade ${className}`}>{children}</div>;
};
const ModalWindow = ({ className, children, refToAdd }) => {
  return (
    <div ref={refToAdd} className={`modal-background ${className}`}>
      {children}
    </div>
  );
};
const ModalDialog = ({ showModal, setShowModal, Content, closable = true }) => {
  const node = useRef();
  const closeWindow = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    const listener = (event) => {
      if (!node.current || node.current.contains(event.target) || !closable) {
        return;
      }
      closeWindow();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    showModal && (document.body.style.overflow = "hidden");

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.body.style.overflow = "unset";
    };
  }, [node, closeWindow, showModal, closable]);

  return (
    <>
      {showModal ? (
        <Background className={`${showModal ? "active" : ""}`}>
          <ModalWindow
            className={`modal-background ${showModal ? "active" : ""}`}
            showModal={showModal}
            refToAdd={node}>
            {Content}
          </ModalWindow>
        </Background>
      ) : null}
    </>
  );
};

export default ModalDialog;
