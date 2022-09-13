const { json } = require('express/lib/response');
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(() => {
    console.log('Database initiate fail');
  });

//전체
const getStore = async page => {
  const store = await myDataSource.query(
    `SELECT
      l_c.name AS categoryName,
      l.name AS storeName,
      l.location,
      l.phone,
      l.is_tea_spot
    FROM shop_location l
    JOIN location_category l_c ON l_c.id = l.category_id
    LIMIT ?, 10`,
    [(page - 1) * 10]
  );
  return store;
};

//카테고리별 스토어
const getStoreCategory = async (category, page) => {
  const store = await myDataSource.query(
    `SELECT
      l_c.name AS categoryName,
      l.name AS storeName,
      l.location,
      l.phone,
      l.is_tea_spot
    FROM shop_location l
    JOIN location_category l_c ON l_c.id = l.category_id
    WHERE l_c.name = ?
    LIMIT ?, 10`,
    [category, (page - 1) * 10]
  );
  return store;
};

module.exports = {
  getStore,
  getStoreCategory,
};
