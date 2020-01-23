const RoleSet = require("../models/roleSet");

const cards = {
  original: [
    "doppelganger",
    "drunk",
    "hunter",
    "insomniac",
    "mason",
    "minion",
    "robber",
    "seer",
    "tanner",
    "troublemaker",
    "villager",
    "werewolf"
  ],
  daybreak: [
    "alpha wolf",
    "apprentice seer",
    "bodyguard",
    "curator",
    "dream wolf",
    "mystic wolf",
    "paranormal investigator",
    "revealer",
    "sentinel",
    "village idiot",
    "witch"
  ],
  alien: [
    "alien",
    "blob",
    "cow",
    "exposer",
    "groob",
    "leader",
    "mortician",
    "oracle",
    "pyschic",
    "rascal",
    "synthetic alien",
    "zerb"
  ],
  vampire: [
    "apprentice assassin",
    "assassin",
    "copycat",
    "cupid",
    "diseased",
    "gremlin",
    "investigator",
    "marksman",
    "pickpocket",
    "priest",
    "rendfield",
    "the count",
    "the master",
    "vampire"
  ],
  super_villains: [
    "annoying lad",
    "detector",
    "dr peeker",
    "evilometer",
    "flipper",
    "henchman",
    "intern",
    "mad scientist",
    "mirror man",
    "rapscallion",
    "role retriever",
    "self-awareness girl",
    "switcheroo",
    "temptress",
    "voodoo lou"
  ],
  bonus: [
    "apprentice tanner",
    "aura seer",
    "beholder",
    "body snatcher",
    "cursed",
    "defender-er",
    "empath",
    "family man",
    "nostradamus",
    "prince",
    "ricochet rhino",
    "squire",
    "the sponge",
    "thing",
    "windy wendy"
  ]
};

const getRoleSets = async (req, res, next) => {
  let roleSets;
  try {
    roleSets = await RoleSet.find();
  } catch (error) {
    console.log("[server:roleset-controller]", error);
    return next(error);
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
    return next(error);
  }
  res.json({ roleset: roleset.toObject({ getters: true }) });
};

const createRoleSet = async (req, res, next) => {
  const { title, complexity, username, desc, roles } = req.body;

  let expansions = [];
  for (let i = 0; i < roles.length; i++) {
    if (cards.original.find(c => c == roles[i])) {
      expansions.push("original");
    }
    if (cards.daybreak.find(c => c == roles[i])) {
      expansions.push("daybreak");
    }
    if (cards.alien.find(c => c == roles[i])) {
      expansions.push("alien");
    }
    if (cards.vampire.find(c => c == roles[i])) {
      expansions.push("vampire");
    }
    if (cards.super_villains.find(c => c == roles[i])) {
      expansions.push("super villains");
    }
    if (cards.bonus.find(c => c == roles[i])) {
      expansions.push("bonus");
    }
  }
  expansions = expansions.filter((a, b) => expansions.indexOf(a) === b);

  const createdRoleSet = new RoleSet({
    title,
    players: roles.length - 3,
    complexity,
    rating: 0,
    username,
    expansions,
    desc,
    roles
  });

  try {
    await createdRoleSet.save();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.status(201).json({ roleset: createdRoleSet.toObject({ getters: true }) });
};

exports.getRoleSets = getRoleSets;
exports.getRoleSetById = getRoleSetById;
exports.createRoleSet = createRoleSet;
