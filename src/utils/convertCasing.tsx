export const keysToCamel = value => {
  if (isObject(value)) {
    const object = {};

    Object.keys(value).forEach(key => {
      object[toCamel(key)] = keysToCamel(value[key]);
    });

    return object;
  } if (Array.isArray(value)) {
    return value.map(object => keysToCamel(object));
  }

  return value;
};

function isObject(value) {
  return value === Object(value) && !Array.isArray(value) && typeof value !== 'function';
}

function toCamel(string) {
  return string.replace(/([-_][a-z])/ig, ($1) =>
    $1.toUpperCase().replace('-', '').replace('_', ''),
  );
}
