// Services
import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';
// For demo-data before backend connection
import { wapTemplate_1 } from '../templates/wap/wap-template-1';
import { wapTemplate_2 } from '../templates/wap/wap-template-2';
import { wapTemplate_3 } from '../templates/wap/wap-template-3';


export const asyncStorageService = {
    query,
    get,
    post,
    put,
    remove,
}


// User's saved waps. This will be wap collection in wap_db later.
const ENTITY_STORAGE_KEY = 'wap';

// ==============================================================
// This is a demo server with its' service combined into one file 
// ==============================================================

// entityStorageKey is the localStorage key (ENTITY_STORAGE_KEY), we pass it inside wapService as if it was the url of the server in an ajax request.


// Get entities
function query(entityStorageKey, delay = 1000) {
    // Option 1 - always get some sort of entites
    const entities = _loadEntitiesFromStorage(entityStorageKey) || _createEntities();
    // Option 2 - get an empty array
    // const entities = _loadEntitiesFromStorage(entityStorageKey) || [];
    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}

// Get entity by id
async function get(entityStorageKey, entityId) {
    const entities = await query(entityStorageKey);
    const entity = entities.find(entity => entity._id === entityId);
    return entity;
}

// Delete an entity
// In ajax request we'll use a delete method, cant call the function "delete" here since its a javascript reserved word.
async function remove(entityStorageKey, entityId) {
    const entities = await query(entityStorageKey);
    const idx = entities.findIndex(entity => entity._id === entityId);
    entities.splice(idx, 1);
    _saveEntitiesToStorage(entityStorageKey, entities);
}

// Add a new entity
function post(entityStorageKey, entityToAdd) {
    entityToAdd._id = utilService.getRandomId();
    const entities = _loadEntitiesFromStorage(entityStorageKey) || [];
    entities.push(entityToAdd);
    _saveEntitiesToStorage(entityStorageKey, entities);
    return entityToAdd;
}

// Update an existing entity
async function put(entityStorageKey, updatedEntity) {
    const entities = await query(entityStorageKey);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _saveEntitiesToStorage(entityStorageKey, entities);
    return updatedEntity;
}


// *** *** *** PRIVATE FUNCTIONS *** *** *** //

// For demo-data purposes only. If user didn't create any waps yet, this will be his collection.
function _createEntities() {
    const entities = [wapTemplate_1, wapTemplate_2, wapTemplate_3];
    _saveEntitiesToStorage(ENTITY_STORAGE_KEY, entities);
    return entities;
}

function _saveEntitiesToStorage(entityStorageKey, entities) {
    storageService.saveToStorage(entityStorageKey, entities);
}

function _loadEntitiesFromStorage(entityStorageKey) {
    return storageService.loadFromStorage(entityStorageKey);
}