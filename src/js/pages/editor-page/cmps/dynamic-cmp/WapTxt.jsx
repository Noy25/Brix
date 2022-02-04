export function WapTxt({ cmp, onSetCurrElement, handleTxtChange, currElementId, style, isPublished, textRef }) {

   if (isPublished) {
      return <span>
         <p style={style}
            className={cmp.className || ''}
         >
            {cmp.txt}
         </p>
      </span>
   }

   return <span>
      <p style={style}
         className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
         onClick={(ev) => onSetCurrElement(ev, cmp)}
         onMouseOut={(ev) => { ev.target.classList.remove('element-hover') }}
         onMouseOver={({ target }) => { target.classList.add('element-hover') }}
         onBlur={(ev) => handleTxtChange(ev, cmp)}
         contentEditable="true"
         suppressContentEditableWarning={true}
         spellCheck="false"
         ref={cmp.id === currElementId ? textRef : null}
      >
         {cmp.txt}
      </p>
   </span>
}