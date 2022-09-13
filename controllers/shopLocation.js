const shopLocationService = require('../services/shopLocation');

//3depth + type + (sort)
const getStore = async (req, res) => {
  const { page } = req.query;
  try {
    const store = await shopLocationService.getStore(page);
    res.status(200).json({ data: store });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

const getStoreCategory = async (req, res) => {
  const { category } = req.params;
  const { page } = req.query;
  try {
    const store = await shopLocationService.getStoreCategory(category, page);
    res.status(200).json({ data: store });
  } catch (error) {
    res.status(404).json({ message: 'ERROR' });
  }
};

module.exports = {
  getStore,
  getStoreCategory,
};
