import { openDB } from 'idb';

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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	console.log('putDb')
	const jateDB = await openDB('jate',1);
	const action = jateDB.transaction('jate', 'readwrite')
	const storeData = action.objectStore('jate')
	const put = storeData.put({ id : 1, text: content })
	const output = await put;
	console.log('Data saved to db ', output)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('getDb');
	const jateDB = await openDB('jate',1);
	const action = jateDB.transaction('jate', 'readonly')
	const storeData = action.objectStore('jate')
	const get = storeData.getAll()
	const result = await get;
	console.log('result.value', result)
	return result.value
};

initdb();
