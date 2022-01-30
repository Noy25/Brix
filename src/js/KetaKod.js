// *** Rephrased for demo purposes *** //

// Main
function findTarget(website, elementId, callbackFn) {
    if (!website.cmps) return;
    const elementIndex = website.cmps.findIndex(cmp => cmp.id === elementId);
    if (elementIndex > -1) {
        callbackFn(website.cmps, elementIndex);
        return;
    } else {
        website.cmps.forEach(cmp => findTarget(cmp, elementId, callbackFn));
    }
}


// Example 1
export function removeElement(element) {
    return (dispatch, getState) => {
        let { wap } = getState().wapModule;
        wap = JSON.parse(JSON.stringify(wap));

        //
        findTarget(wap, element.id, (cmpsArr, idx) => cmpsArr.splice(idx, 1));
        //

        draftService.saveDraft(wap);
        if (wap.id) socketService.emit('update-wap', wap);
        dispatch({ type: 'UPDATE_WAP', wap });
    }
}

// Example 2
export function duplicateElement(element) {
    return (dispatch, getState) => {
        let { wap } = getState().wapModule;
        wap = JSON.parse(JSON.stringify(wap));
        const elementId = element.id;
        element = JSON.parse(JSON.stringify(element));
        wapService.replaceIds(element);

        //
        findTarget(wap, elementId, (cmpsArr, idx) => cmpsArr.splice(idx, 0, element));
        //

        draftService.saveDraft(wap);
        if (wap.id) socketService.emit('update-wap', wap);
        dispatch({ type: 'UPDATE_WAP', wap })
        return element;
    }
}