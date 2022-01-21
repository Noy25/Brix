import { DynamicCmp } from './DynamicCmp';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export function WapDiv(props) {
   const { cmp, onSetCurrElement, currElementId, style, idx, mediaClass } = props

   if (cmp.isPublished) {
      return <div
         style={style}
         className={`${mediaClass} ${cmp.name || ''}`}>
         {
            cmp.cmps && cmp.cmps.map(c => {
               const propsCopy = { ...props }
               delete propsCopy.cmp
               return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
            })
         }
      </ div >
   }




   // return <Droppable droppableId={cmp.id}>
   // {
   //    provided => {
   // return <span {...provided.droppableProps}
   //    ref={provided.innerRef}>
   if (!cmp.category) {
      if (cmp.id === "7C2hdg6")
         console.log('its not draggable');
      return <div
         onClick={(ev) => onSetCurrElement(ev, cmp)}
         onMouseOut={(ev) => { ev.target.classList.remove('element-hover') }}
         onMouseOver={({ target }) => { target.classList.add('element-hover') }}
         style={style}
         className={`${cmp.id === currElementId ? 'edit-active ' : ''}${cmp.category ? mediaClass : ''} ${cmp.name || ''}`}
      >
         {
            cmp.cmps && cmp.cmps.map(c => {
               const propsCopy = { ...props }
               delete propsCopy.cmp
               return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
            })
         }
      </ div >
   }

   {/* {provided.placeholder} */ }
   //    </span>
   // }}
   // </Droppable >




   return <Draggable key={cmp.id} draggableId={cmp.id} index={idx}>
      {(provided, snapshot) => {
         return <span
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
         >

            <div

               onClick={(ev) => onSetCurrElement(ev, cmp)}
               onMouseOut={(ev) => { ev.target.classList.remove('element-hover') }}
               onMouseOver={({ target }) => { target.classList.add('element-hover') }}
               style={style}
               className={`${cmp.id === currElementId ? 'edit-active ' : ''}${cmp.category ? mediaClass : ''} ${cmp.name || ''}`}
            >
               {
                  cmp.cmps && cmp.cmps.map(c => {
                     const propsCopy = { ...props }
                     delete propsCopy.cmp
                     return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
                  })
               }
            </ div >
         </span>
      }}
   </Draggable>
}