const userModel = (obj) => ({
  id: obj.ID,
  pw: obj.PASSWORD,
  name: obj.NAME,
  auth: obj.AUTHORITY
});

module.exports = userModel;