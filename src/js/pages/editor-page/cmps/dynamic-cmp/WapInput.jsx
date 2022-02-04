export function WapInput({ cmp, onSetCurrElement, currElementId, isPublished }) {

   if (isPublished) {
      return <span>
         <label
            style={cmp.style}
            className={cmp.className || ''}
         >
            {cmp.label}

            <input type={cmp.inputType} name="" placeholder={cmp.placeholder} />
         </label>
      </span>
   }

   return <span>
      <label
         style={cmp.style}
         onClick={(ev) => onSetCurrElement(ev, cmp)}
         className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
      >
         {cmp.label}

         <input type={cmp.inputType} name="" placeholder={cmp.placeholder} />
      </label>
   </span>

}