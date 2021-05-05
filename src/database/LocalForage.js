import localForage from 'localforage';

// Using setDriver()
localForage.setDriver([
  localForage.INDEXEDDB,
  localForage.LOCALSTORAGE,
  localForage.WEBSQL,
]);

export default localForage;
