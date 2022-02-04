// React
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// Services
import { socketService } from '../../services/socket.service';
// Actions
import { loadDraftWap, switchElement, joinRoom, updateWapInRoom } from '../../store/wap.action';
// Cmps
import { EditorSidebar } from './cmps/EditorSidebar';
import { EditorBoard } from './cmps/EditorBoard';
import { Cursors } from './cmps/Cursors';
// Assets
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';


export function EditorPage() {

   const dispatch = useDispatch();
   const { wapId } = useParams();

   const [isDragActive, setDragActive] = useState(false);
   const [placeholderProps, setPlaceholderProps] = useState({});

   useEffect(() => {
      dispatch(loadDraftWap());

      // Socket initialization on connection happens inside Cursors.jsx component
      // User joined via share link :
      if (wapId) {
         dispatch(joinRoom(wapId));
      }

      // Every user listens to wap updates :
      socketService.off('wap-updated');
      socketService.on('wap-updated', wapId => dispatch(updateWapInRoom(wapId)));

      return () => {
         // Reset states just in case of memory leak :
         setDragActive(false);
         setPlaceholderProps({});
         socketService.off('wap-updated');
      }
   }, [])


   const getDraggedDom = draggableId => {
      const domQuery = `[data-rbd-drag-handle-draggable-id='${draggableId}']`;
      const draggedDOM = document.querySelector(domQuery);
      return draggedDOM;
   };

   // Drag Start
   const onDragStart = event => {

      if (event.source.droppableId === 'board') setDragActive(true);

      const draggedDOM = getDraggedDom(event.draggableId);
      if (!draggedDOM) return;

      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = event.source.index;
      let clientY =
         parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
         [...draggedDOM.parentNode.children]
            .slice(0, sourceIndex)
            .reduce((total, curr) => {
               const style = curr.currentStyle || window.getComputedStyle(curr);
               const marginBottom = parseFloat(style.marginBottom);
               return total + curr.clientHeight + marginBottom;
            }, 0);

      setPlaceholderProps({
         display: (event.source.droppableId === 'sidebar') ? 'none' : 'block',
         clientHeight,
         clientWidth,
         clientY,
         clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
      });
   }

   // Drag Update
   const onDragUpdate = event => {
      if (!event.destination) return;

      const draggedDOM = getDraggedDom(event.draggableId);
      if (!draggedDOM) return;

      const { clientHeight, clientWidth } = draggedDOM;
      const destinationIndex = event.destination.index;
      const sourceIndex = event.source.index;

      const childrenArray = [...draggedDOM.parentNode.children];
      const movedItem = childrenArray[sourceIndex];
      childrenArray.splice(sourceIndex, 1);

      const updatedArray = [
         ...childrenArray.slice(0, destinationIndex),
         movedItem,
         ...childrenArray.slice(destinationIndex + 1)]

      let clientY =
         parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
         updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginBottom = parseFloat(style.marginBottom);
            return total + curr.clientHeight + marginBottom;
         }, 0);

      setPlaceholderProps({
         display: (event.source.droppableId === 'sidebar') ? 'none' : 'block',
         clientHeight,
         clientWidth,
         clientY,
         clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
      });
   };

   // Drag End
   const onDragEnd = (res) => {
      const { destination, source } = res;
      if (!destination) return;

      if (destination.droppableId === 'sidebar') return setDragActive(false);

      if (destination.droppableId === source.droppableId &&
         destination.index === source.index) return setDragActive(false);

      if (source.droppableId === 'sidebar' &&
         destination.droppableId === 'garbage') return setDragActive(false);

      dispatch(switchElement(res));
      setDragActive(false);
   }


   return <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}>

      <main className={`editor-page ${isDragActive ? 'drag-active' : ''}`}>
         <EditorSidebar />
         <EditorBoard placeholderProps={placeholderProps} />

         <Droppable droppableId='garbage'>
            {provided => {
               return <div className='garbage'
                  {...provided.droppableProps}
                  ref={provided.innerRef}>&times;</div>
            }}
         </Droppable>
      </main >

      <Cursors wapId={wapId} />

   </DragDropContext>

}