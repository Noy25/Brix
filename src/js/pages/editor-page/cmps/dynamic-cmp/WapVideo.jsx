export function WapVideo({ cmp, onSetCurrElement, style, currElementId, isPublished }) {

   if (isPublished) {
      return <span>
         <iframe title="published" width={cmp.width || '400'} style={style}
            className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
            src={cmp.url}>
         </iframe>
      </span>
   }

   return <span>
      <iframe title="Video" width={cmp.width || '400'} style={style}
         allowFullScreen
         onClick={(ev) => onSetCurrElement(ev, cmp)}
         className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
         src={cmp.url}>
      </iframe>
   </span>
}