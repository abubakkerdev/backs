const handleCategory = (req, res) => {
  res.send("All Category Data Show.");
};

const handleStoreCategory = (req, res) => {
  res.send("Store Single Category Data.");
};

const handleEditCategory = (req, res) => {
  res.send("Edit Single Category Data.");
};

const handleUpdateCategory = (req, res) => {
  res.send("Update Single Category Data.");
};

const handleDestroyCategory = (req, res) => {
  res.send("Delete Single Category Data.");
};

module.exports = {
  handleCategory,
  handleStoreCategory,
  handleEditCategory,
  handleUpdateCategory,
  handleDestroyCategory,
};
