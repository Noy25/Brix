import { storageService } from './storage.service';


export const draftService = {
    saveDraft,
    loadDraft,
    resetDraft,
}


const DRAFT_WAP_STORAGE_KEY = 'draft_wap'; // Draft Wap from localStorage

function saveDraft(wap) {
    _saveDraftToStorage(wap);
}

function loadDraft() {
    const draftWap = _loadDraftFromStorage() || _createDraftWap();
    return draftWap;
}

function resetDraft() {
    _removeDraftFromStorage();
    return loadDraft();
}

// *** *** *** Private Functions *** *** *** //

function _createDraftWap() {
    const draftWap = {
        name: 'new webApp',
        thumbnail: '',
        cmps: [],
        isPublished: false,
        isTemplate: false
    }

    _saveDraftToStorage(draftWap);

    return draftWap;
}

function _saveDraftToStorage(wap) {
    storageService.saveToStorage(DRAFT_WAP_STORAGE_KEY, wap);
}

function _loadDraftFromStorage() {
    return storageService.loadFromStorage(DRAFT_WAP_STORAGE_KEY);
}

function _removeDraftFromStorage() {
    storageService.removeFromStorage(DRAFT_WAP_STORAGE_KEY);
}