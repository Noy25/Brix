// *** Rephrased for demo purposes *** //

import { draftService } from "./services/draft.service";
import { socketService } from "./services/socket.service";
import { wapService } from "./services/wap.service";



// Main
function findTarget(webApp, elementId, cb) {
    if (!webApp.cmps) return;
    const elementIndex = webApp.cmps.findIndex(cmp => cmp.id === elementId);
    if (elementIndex > -1) {
        cb(webApp.cmps, elementIndex);
        return;
    } else {
        webApp.cmps.forEach(cmp => findTarget(cmp, elementId, cb));
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