import {openDB} from 'idb';

const dbName= 'toDoList';
const table= 'Items';

async function getdb(){
    try{
        const db= await openDB(dbName, 1, {
            upgrade(db){
                if(!db.objectStoreNames.contains(table)){
                    db.createObjectStore(table, {keyPath: 'id' , autoIncrement: true});
                }
            }
        });
        return db;
        }catch(err){
            console.log("failed to open the database ", err);
        }
}

async function addNotesDb(note){
    const db=await getdb();
    try{
        const tx=db.transaction(table, 'readwrite');
        const store= tx.objectStore(table);
        const id = await store.add(note);
        console.log("added");
        await tx.done;
        return id; 
    }catch(err){
        console.log('failed to add item');
    }
}

async function getAllNotes(){
    const db=await getdb();
    try{
        const tx= db.transaction(table, 'readonly');
        const store= tx.objectStore(table);
        const values= await store.getAll();
        const keys= await store.getAllKeys();

        const notes= keys.map((key, index)=>({
            id: key,
            ...values[index]
        }));
        return notes;
    }catch(err){
        console.log("error in fetching values");
    }
}

async function deleteNoteDB(id){
    const db= await getdb();
    try{
        const tx= db.transaction(table, 'readwrite');
        const store= tx.objectStore(table);
        await store.delete(id);
        await tx.done;
        
    }catch(err){
        console.error('Failed to delete note:', err);
    }
}

export {addNotesDb, deleteNoteDB, getAllNotes};