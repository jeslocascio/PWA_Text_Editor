import { openDB } from 'idb';

// Logic for a method that opens the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic for a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("Calling PutDB");
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content});
  const result = await request;
  console.log("Data has been saved", result.valueOf());
  return tx.done;
  } catch (error) {
    console.error(error);
  }
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Calling GetDB");
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  return result?.value;
};

initdb();
