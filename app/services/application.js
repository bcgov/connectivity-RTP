import schema from '../schemas/schema';

export const LAST_PAGE =
  Object.keys(schema.properties).length - getPropertyDependencies(schema.dependencies).length;


function getPropertyDependencies(dependencies) {
  const isObject = obj => obj === Object(obj);
  const propertyDependencies = [];
  if (isObject(dependencies)) {
    Object.entries(dependencies).forEach(([ownerProperty, value]) => {
      if (value.oneOf) {
        value.oneOf.forEach(scenario => {
          if (scenario.required) {
            propertyDependencies.push({ [ownerProperty]: scenario.required[0] });
          }
        });
      }
    });
  }
  return propertyDependencies;
}
