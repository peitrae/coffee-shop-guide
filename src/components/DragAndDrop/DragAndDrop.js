import React, { useState, useRef, useEffect } from "react";

import "./DragAndDrop.scss";

const DragAndDrop = ({ className, children, handleDrop }) => {
  const dropRef = useRef();

  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(false);

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);

    if (dragCounter > 0) return;

    setDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  useEffect(() => {
    setDragCounter(0);

    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);

    return () => {
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={dropRef} className={`dnd ${className}`}>
      {dragging ? (
        <div className="dnd-ondrag">
          <span>Drop here</span>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default DragAndDrop;
