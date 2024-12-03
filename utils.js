const sum = (a, b) => a + b;

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 1000);
  });
};

let db = {};
const initializeCityDatabase = () => {
  db = {
    Vienna: "Vienna",
    "San Juan": "San Juan",
  };
  return db;
};
const initializeCityDatabasePromise = () => {
  db = {
    Vienna: "Vienna",
    "San Juan": "San Juan",
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db);
    }, 1000);
  });
};

const clearCityDatabase = () => {
  db = {};
};
const clearCityDatabasePromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      db = {};
      resolve(db);
    }, 1000);
  });
};

const isCity = (city) => {
  return city === db[city];
};

module.exports = {
  sum,
  fetchData,
  initializeCityDatabase,
  clearCityDatabase,
  isCity,
  initializeCityDatabasePromise,
  clearCityDatabasePromise,
  db,
};
