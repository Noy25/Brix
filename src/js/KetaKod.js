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
        let { webApp } = getState().wapModule;
        webApp = JSON.parse(JSON.stringify(webApp));

        //
        findTarget(webApp, element.id, (cmpsArr, idx) => cmpsArr.splice(idx, 1));
        //

        draftService.saveDraft(webApp);
        if (webApp.id) socketService.emit('update-wap', webApp);
        dispatch({ type: 'UPDATE_WAP', webApp });
    }
}




// Example 2
export function duplicateElement(element) {
    return (dispatch, getState) => {
        let { webApp } = getState().wapModule;
        webApp = JSON.parse(JSON.stringify(webApp));
        const elementId = element.id;
        element = JSON.parse(JSON.stringify(element));
        wapService.replaceIds(element);

        //
        findTarget(webApp, elementId, (cmpsArr, idx) => cmpsArr.splice(idx, 0, element));
        //

        draftService.saveDraft(webApp);
        if (webApp.id) socketService.emit('update-wap', webApp);
        dispatch({ type: 'UPDATE_WAP', webApp })
        return element;
    }
}