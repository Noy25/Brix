export function WapImg({ cmp, onSetCurrElement, currElementId, style, isPublished }) {

   if (isPublished) {
      return <span>
         <img style={style}
            className={cmp.className || ''}
            src={cmp.url}
            alt="Missing image" />
      </span>
   }


   return <span>
      <img style={style}
         className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
         src={cmp.url}
         onMouseOut={(ev) => { ev.target.classList.remove('element-hover') }}
         onMouseOver={({ target }) => { target.classList.add('element-hover') }}
         onClick={(ev) => onSetCurrElement(ev, cmp)}
         alt="Missing img" />
   </span>
}