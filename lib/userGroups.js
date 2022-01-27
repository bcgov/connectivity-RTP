const GROUP_META = require("../app/data/groups.json");

export const getAllGroups = () => {
  return Object.keys(GROUP_META);
};

export const compactGroups = (groups) => {
  const allDefinedGroups = getAllGroups();

  return groups.filter((group) => allDefinedGroups.includes(group));
};

export const getPriorityGroupData = (validGroups) => {
  // Find the highest priority groups
  let priorityGroup = {
    name: "unauthenticated",
    ...GROUP_META.unauthenticated,
  };

  for (let x = 0, len = validGroups.length; x < len; x++) {
    const name = validGroups[x];
    const curr = GROUP_META[name];

    if (curr.priority < priorityGroup.priority) {
      priorityGroup = { ...curr, name };
    }
  }

  return priorityGroup;
};

export const getPriorityGroup = (groupNames) => {
  const validGroups = compactGroups(groupNames);
  const priorityGroupData = getPriorityGroupData(validGroups);

  return priorityGroupData.name;
};

export const getUserGroupLandingRoute = (groupNames) => {
  const validGroups = compactGroups(groupNames);
  const priorityGroupData = getPriorityGroupData(validGroups);

  return priorityGroupData.path;
};
