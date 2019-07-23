export const removeFunctions = (obj: any) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    console.log("Failed to remove Function", obj);
    throw e;
  }
};

const primitivesTypes = ["number", "string"];
export const removeCircularReferences = (obj: any, seenObjects = []) => {
  obj = jsonClone(obj);
  const pairs = getKeyValuePairs(obj);
  pairs.forEach(({ key, value }) => {
    const type = typeof value;
    if (primitivesTypes.indexOf(type) < 0) {
      if (seenObjects.indexOf(value) >= 0) {
        console.log("found circular obj", key);
        delete obj[key];
      }
      seenObjects.push(value);
    }
    if (type === "object") {
      obj[key] = removeCircularReferences(value, seenObjects);
    }
  });
  return obj;
};

export const jsonClone = <T>(obj: T) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEqual = (obj1: any, obj2: any, { currentDepth = 1, maxDepth = 100 } = {}) => {
  if (currentDepth > maxDepth) {
    return true;
  }
  if ((!obj1 && obj2) || (!obj2 && obj1)) {
    return false;
  }
  if (!obj1 && !obj2) {
    return true;
  }
  obj1 = removeFunctions(obj1);
  obj2 = removeFunctions(obj2);
  const type1 = typeof obj1;
  const type2 = typeof obj2;
  if (type1 !== type2) {
    return false;
  }
  if (obj1 instanceof Array) {
    if (obj2 instanceof Array) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      if (obj1.length === 0) {
        return true;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!isEqual(obj1[i], obj2[i], { currentDepth: currentDepth + 1 })) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  if (type1 === "object") {
    if (type2 === "object") {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (!isEqual(keys1, keys2)) {
        return false;
      }
      for (const key of keys1) {
        if (!isEqual(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  return obj1 === obj2;
};

export const shallowCompare = function(dis: any, nextProp: any, nextState: any, { maxDepth = 2 } = {}) {
  const thisProps = {
    ...dis.props,
    children: undefined,
    mainStore: undefined,
    magentoStore: undefined
  };
  nextProp = {
    ...nextProp,
    children: undefined,
    mainStore: undefined,
    magentoStore: undefined
  };
  return !isEqual(thisProps, nextProp, { maxDepth }) || !isEqual(dis.state, nextState, { maxDepth });
};
export const shallowEqual = (a, b) => {
  return isEqual(a, b, { maxDepth: 1 });
};
const ALLOWED_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";
const escapeMax = 1000;
export const encodeNumber = (num: number) => {
  let remaining = num;
  let loopCount = 0;
  let str = "";
  const length = ALLOWED_CHARS.length;
  while (remaining !== 0 && loopCount < escapeMax) {
    const index = remaining % length;
    remaining = Math.floor(remaining / length);
    str = ALLOWED_CHARS[index] + str;
    loopCount++;
  }
  return str;
};

export const decodeNumber = (str: string) => {
  let accumulator = 0;
  for (let i = 0; i < str.length; i++) {
    const index = ALLOWED_CHARS.indexOf(str[i]);
    const paw = Math.pow(ALLOWED_CHARS.length, str.length - i - 1);
    accumulator += index * paw;
  }
  return accumulator;
};

export const encodeDate = (date: Date = new Date(), { precision = 1 } = {}) => {
  const time = date.getTime();
  return encodeNumber(Math.floor(time / precision));
};

export const decodeDate = (encoded: string, { precision = 1 } = {}) => {
  return new Date(new Date(decodeNumber(encoded) * precision).getTime());
};

export const shortId = (chars = 6) => {
  const num = Math.floor(Math.floor(Math.random() * Math.pow(ALLOWED_CHARS.length, chars)));
  return encodeNumber(num);
};

export const newUUID = (sections = 6) => {
  let id = "";
  let i = 0;
  for (i; i < sections; i++) {
    id = `${id}${shortId()}`;
  }
  return id;
};
export const toTimeZone = (date: Date, offsetHours: number): Date => {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offsetHours);

  // return time as a string
  return nd;
};

export const toFixed = (num: number, dec?: number): string => {
  if (num) {
    return num.toFixed(dec);
  } else {
    return "0";
  }
};

export const getValues = <T>(object: { [key: string]: T }): T[] => {
  if (object) {
    return Object.keys(object).map(key => object[key]);
  } else {
    return [];
  }
};

export const getKeyValuePairs = <T>(object: T) => {
  if (!object) {
    return [];
  }
  return Object.keys(object).map((key: any) => ({ key, value: object[key] }));
};

export const validateEmail = (email: string): string => {
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(email.toLowerCase());
  if (!valid) {
    return "Invalid Email";
  }
  return "";
};
export const validatePhoneNumber = (number: string): string => {
  const valid = /^[0-9\(\)\s-+]*$/gm.test(number);
  if (!valid) {
    return "phone number can only contain numbers, +, - and space";
  }
  return "";
};
export const validatePhoneNumberNoCountry = (number: string): string => {
  const valid = /^[0-9\(\)\s-]*$/gm.test(number);
  if (!valid) {
    return "phone number can only contain numbers, - and space";
  }
  return "";
};
export const validatePostalCode = (code: string): string => {
  const valid = /^[0-9]*$/gm.test(code);
  if (!valid) {
    return "postal code can only contain numbers.";
  }
  return "";
};
export const sleep = (ms: number) => new Promise(resolve => setTimeout(() => resolve(), ms));

export const count = <T>(list: T[], item: T): number => {
  let count = 0;
  list.forEach(i => {
    if (i === item) {
      count++;
    }
  });
  return count;
};

export const removeRepeated = (list: any[]) => {
  const newList = [];
  list.forEach(item => {
    if (!newList.find(i => i === item)) {
      newList.push(item);
    }
  });
  return newList;
};

export const hash = (str: string) => {
  return (
    str.split("").reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0) + ""
  );
};

export const removeFromArray = <T>(array: T[], item: T): T[] => {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
  return array;
};

export const areAttributesInObject = (object: any, attributes: string[]) => {
  for (const key of attributes) {
    if (!object[key]) {
      return false;
    }
  }
  return true;
};

export const removeEmptyValues = (object: any) => {
  const newObj: any = {};
  for (const { key, value } of getKeyValuePairs(object)) {
    if (value) {
      let shouldAdd = true;
      if (typeof value === "object" && Object.keys(value).length <= 0) {
        shouldAdd = false;
      }
      if (shouldAdd) {
        newObj[key] = value;
      }
    }
  }
  return newObj;
};

export const SORT_OPTIONS = {
  price: "Price Low to High",
  "-price": "Price High to Low",
  name: "Name A-Z",
  "-name": "Name Z-A",
  "-date": "Most Recent"
  // "date": "Oldest",
};

export const getSortOptionList = () => {
  return getKeyValuePairs(SORT_OPTIONS).map(({ key, value }) => ({
    display: value,
    key
  }));
};

export const removeQuotes = (str: string): string => {
  if (typeof str === "string") {
    str = str.trim();
    if (str.startsWith('"') && str.endsWith('"')) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};

export const currencyToSymbol = (str: "SGD" | string = "SGD") => {
  if (str === "SGD") {
    return "S$";
  } else {
    return "$";
  }
};

export const toJsonString = (obj, ...args) => {
  try {
    return JSON.stringify(obj, ...args);
  } catch (e) {
    console.log("Failed to convert to JSON string: ");
    throw { error: e, obj: args };
  }
};

export const getRegexMatches = (reg: RegExp, str: string): string[] => {
  const match = reg.exec(str);
  if (match) {
    match.shift();
    return match;
  }
  return [];
};

export const getFirstRegexMatch = (regex: RegExp, str: string): string => {
  const matches = getRegexMatches(regex, str);
  if (matches.length > 0) {
    return matches[0];
  }
  return null;
};

export const isEqualIgnoreCases = (a: string, b: string): boolean => {
  if ((a && !b) || (!a && b)) {
    return false;
  }
  if (!a && !b) {
    return true;
  }
  return a.toLowerCase() === b.toLowerCase();
};

export const containsIgnoreCases = (a: string, b: string): boolean => {
  if (!b) {
    b = "";
  }
  if (!a) {
    return false;
  }
  return a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
};
export const parseDate = (dateString: string) => {
  return new Date(dateString.replace(/-/g, "/"));
};

export const getSGTime = () => {
  let d = new Date();
  let utc = d.getTime() + d.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 8);
};

export const formatToMagentoDate = (date: Date) => {
  return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1, 2)}-${formatNumber(date.getDate(), 2)}`;
};
export const formatNumber = (n: number, targetLength: number) => {
  let output = n + "";
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return output;
};

export const formatTimePassed = (diff: number) => {
  return new Date(new Date("2017-05-02T00:00").getTime() + diff).toLocaleTimeString();
};

export const isGift = (item: { sku: string }) => {
  return item.sku.indexOf("Gift") >= 0;
};

export const randomFromList = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getDayOfWeek = (date: Date) => {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
};

export const getDaysInBetween = (date1: Date, date2: Date) => {
  date1.setHours(0);
  date1.setMinutes(0);
  date2.setHours(0);
  date2.setMinutes(0);
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / 1000 / 60 / 60 / 24);
};

export const getPriceRange = (price: number) => {
  if (price < 50) {
    return "Below $50";
  }
  if (price <= 100) {
    return "$50 - $100";
  }
  if (price <= 200) {
    return "$100 - $200";
  }
  if (price <= 400) {
    return "$200 - $400";
  }
  if (price > 400) {
    return "Over  $400";
  }
  return "UNKNOWN";
};
export const doAllAsync = (...tasks: (() => Promise<any>)[]) => {
  const promises: Promise<any>[] = [];
  tasks.forEach(task => {
    promises.push(
      (async () => {
        try {
          return await task();
        } catch (e) {
          return e;
        }
      })()
    );
  });
  return Promise.all(promises);
};
export const escapeRegex = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
const MEMORIZED: any = {};
export const memorize = <T>(key: string, f: () => T): T => {
  const memorized = MEMORIZED[key];
  if (memorized) return memorized;
  const result = f();
  MEMORIZED[key] = result;
  return result;
};

export const toBase64 = (string: string) => btoa(string);
export const fromBase64 = str => atob(str);
