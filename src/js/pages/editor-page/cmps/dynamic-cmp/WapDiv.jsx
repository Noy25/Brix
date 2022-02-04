// Cmps
import { DynamicCmp } from './DynamicCmp';
// Assets
import { Draggable } from 'react-beautiful-dnd';

export function WapDiv(props) {

   const { cmp, onSetCurrElement, currElementId, style, idx, mediaClass, isPublished } = props;

   if (isPublished) {
      return <span>
         <div
            style={style}
            className={`${mediaClass} ${cmp.className || ''}`}>

            {cmp.cmps && cmp.cmps.map(c => {
               const propsCopy = { ...props };
               delete propsCopy.cmp;
               return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
            })}

         </ div >
      </span>
   }


   if (!cmp.category) {
      return <span>
         <div
            onClick={(ev) => onSetCurrElement(ev, cmp)}
            onMouseOut={(ev) => { ev.target.classList.remove("element-hover") }}
            onMouseOver={({ target }) => { target.classList.add("element-hover") }}
            style={style}
            className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.category ? mediaClass : ''} ${cmp.className || ''}`}>

            {cmp.cmps && cmp.cmps.map(c => {
               const propsCopy = { ...props };
               delete propsCopy.cmp;
               return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
            })}

         </ div >
      </span>
   }



   return <Draggable key={cmp.id} draggableId={cmp.id} index={idx}>
      {(provided) => {

         return <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

            <div
               onClick={(ev) => onSetCurrElement(ev, cmp)}
               onMouseOut={(ev) => { ev.target.classList.remove("element-hover") }}
               onMouseOver={({ target }) => { target.classList.add("element-hover") }}
               style={style}
               className={`${cmp.id === currElementId ? 'edit-active ' : ''}${cmp.category ? mediaClass : ''} ${cmp.className || ''}`}>

               {cmp.cmps && cmp.cmps.map(c => {
                  const propsCopy = { ...props }
                  delete propsCopy.cmp
                  return <DynamicCmp key={c.id} cmp={c} {...propsCopy} />
               })}

            </ div >
         </div>
      }}
   </Draggable>
}