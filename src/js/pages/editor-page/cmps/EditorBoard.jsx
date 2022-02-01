import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { setCurrElement, updateCurrElementAttr } from '../../../store/editor.action'

import { Droppable } from 'react-beautiful-dnd';
import { isEmpty } from "lodash";

import { DynamicCmp } from './dynamic-cmp/DynamicCmp'
import { Loader } from '../../../cmps/Loader.jsx'
import { updateWap } from '../../../store/wap.action';


export function EditorBoard({ placeholderProps }) {
   const dispatch = useDispatch();
   const sectionRef = useRef();
   const textRef = useRef();

   const [mediaClass, setMediaClass] = useState('');

   const wap = useSelector(state => state.wapModule.wap);
   const currElement = useSelector(state => state.editorModule.currElement);
   const boardSize = useSelector(state => state.editorModule.boardSize);



   useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
   }, [])

   useEffect(() => {
      handleResize();
   }, [boardSize])

   const handleResize = () => {
      setMediaClass(getMediaClass());
   }

   const getMediaClass = () => {
      if (!sectionRef.current) return;
      const editorWidth = sectionRef.current.offsetWidth;
      let classStr = ''

      if (editorWidth < 600) classStr += 'media-600 ';
      if (editorWidth < 800) classStr += 'media-800 ';
      if (editorWidth < 1000) classStr += 'media-1000 ';
      if (editorWidth < 1200) classStr += 'media-1200 ';

      return classStr
   }

   const onSetCurrElement = (ev, cmp) => {
      ev.stopPropagation();
      if (textRef.current && (cmp.id !== currElement.id)) textRef.current.blur();
      dispatch(setCurrElement(cmp));
      if (sectionRef.current.offsetWidth < 600) {
         ev.target.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
         });
      }
   }

   const handleTxtChange = ({ target }, element) => {
      element = JSON.parse(JSON.stringify(element));
      element.txt = target.innerText;
      dispatch(updateWap(element));
   }

   const getBoardSize = () => {
      if (!boardSize || boardSize === 'desktop') return '';
      else return boardSize;
   }



   //RENDER
   if (!wap?.cmps) return <div> Loading...</div>

   return <Droppable droppableId='board'>
      {(provided, snapshot) => {
         //No curr element
         if (!wap?.cmps?.length) return <div  {...provided.droppableProps}
            ref={provided.innerRef}
            className='editor-board'><div className="choose-template">
               Pick an element from the sidebar
            </div>
         </div>

         //Board
         return <section className={`editor-board ${getBoardSize()}`}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {wap.cmps.map((cmp, i) =>
               <DynamicCmp textRef={textRef} key={i} idx={i} isPublished={false} onSetCurrElement={onSetCurrElement} cmp={cmp} currElementId={currElement?.id} mediaClass={mediaClass} handleTxtChange={handleTxtChange} />
            )}

            {/* Div for boardSize */}
            <div ref={sectionRef}></div>

            {/* Placeholder */}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
               <div
                  className="placeholder"
                  style={{
                     top: placeholderProps.clientY,
                     left: placeholderProps.clientX,
                     height: placeholderProps.clientHeight,
                     width: placeholderProps.clientWidth,
                     display: placeholderProps.display
                  }}
               />
            )}
            {/* Placeholder */}
         </section>
      }}
   </Droppable >
}