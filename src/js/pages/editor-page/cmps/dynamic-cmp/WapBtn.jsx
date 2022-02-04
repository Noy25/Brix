export function WapBtn({ cmp, onSetCurrElement, handleTxtChange, style, currElementId, isPublished, textRef }) {
      if (isPublished) {
            return <span>
                  <a style={style} href={cmp.url} className={cmp.className || ''}>{cmp.txt}</a>
            </span>
      }

      return <span>
            <a style={style}
                  onClick={(ev) => onSetCurrElement(ev, cmp)}
                  href='##'
                  className={`${cmp.id === currElementId ? 'edit-active' : ''} ${cmp.className || ''}`}
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onBlur={(ev) => handleTxtChange(ev, cmp)}
                  spellCheck="false"
                  ref={cmp.id === currElementId ? textRef : null}>
                  {cmp.txt}</a>
      </span>
}