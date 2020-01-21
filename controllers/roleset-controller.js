const RoleSet = require("../models/roleSet");

const getRoleSets = async (req, res, next) => {
  let roleSets;
  try {
    roleSets = await RoleSet.find();
  } catch (error) {
    console.log("[server:roleset-controller]", error);
    return next();
  }
  res.json({
    rolesets: roleSets.map(set => set.toObject({ getters: true }))
  });
};

const getRoleSetById = async (req, res, next) => {
  const rolesetId = req.params.sid;
  let roleset;
  try {
    roleset = await RoleSet.findById(rolesetId);
  } catch (error) {
    console.log("[server:roleset-controller]", error);
    return next();
  }
  res.json({ roleset: roleset.toObject({ getters: true }) });
};

exports.getRoleSets = getRoleSets;
exports.getRoleSetById = getRoleSetById;
