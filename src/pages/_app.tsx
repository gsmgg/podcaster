import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from "../styles/app.module.scss";

import { DndContext } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [parent, setParent] = useState(null);
  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <DndContext onDragEnd={handleDragEnd}>
          <main>
            <Draggable id="draggable">Drag me</Draggable>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
        </DndContext>
      </div>
    </>
  );
}

export default MyApp;
