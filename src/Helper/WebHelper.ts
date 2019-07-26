import * as React from "react";
import { isEqual, hash } from "./GeneralHelper";
export const shallowCompare = function(dis: any, nextProp: any, nextState: any) {
  return !isEqual(dis.props, nextProp) || !isEqual(dis.state, nextState);
};

export const fileToURL = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      const result = e.target.result;
      resolve(result);
    };
    reader.readAsDataURL(file);
  });
};
export const dataURItoBlob = (dataURI: string) => {
  var arr = dataURI.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const applyClass = <T>(obj: any, clazz: new () => T): T => {
  const newObject = new clazz();
  Object.assign(newObject, obj);
  return newObject;
};
export const applyClasses = <T>(objs: any[], clazz: new () => T): T[] => {
  return objs.map(obj => applyClass(obj, clazz));
};

export const getMissingAttributes = <T>(obj: T, attributes: (keyof T)[]): string[] => {
  const missing = [];
  attributes.forEach(att => {
    if (obj[att] === undefined || (obj[att] as any) === "") {
      missing.push(att);
    }
  });
  return missing;
};

export const toIndexedList = <T>(objects: { index: number }[], c?: new () => T): (T)[] => {
  if (!objects) {
    return [];
  }
  const items: (T)[] = [];
  objects.forEach(o => {
    const item = c ? new c() : o;
    if (c) {
      Object.assign(item, o);
    }
    items[o.index] = item as any;
  });
  return items;
};

export const getValues = <T>(object: { [key: string]: T }): T[] => {
  if (object) {
    return Object.keys(object).map(key => object[key]);
  } else {
    return [];
  }
};
let responsiveNameOverride = undefined;
export type ResponsiveName = "web" | "tablet" | "phone";
export const setResponsiveNameOverride = (name: ResponsiveName) => {
  responsiveNameOverride = name;
};
export const getResponsiveName = (width?: number): ResponsiveName => {
  if (responsiveNameOverride) {
    return responsiveNameOverride;
  }
  if (!width && !window) {
    return "web";
  }
  if (!width) {
    width = window.innerWidth;
  }
  if (width <= 758) {
    return "phone";
  }
  if (width <= 992) {
    return "tablet";
  }
  if (width <= 1200) {
    return "web";
  }
  return "web";
};
export const selectResponsive = <T>(op: { web?: T; tablet?: T; phone?: T }): T => {
  if (!window) {
    return op.web;
  }
  const width = window.innerWidth;

  if (width <= 758 && op.phone) {
    return op.phone;
  }
  if (width <= 992 && op.tablet) {
    return op.tablet;
  }
  if (width <= 1200 && op.web) {
    return op.web;
  }
  return op.web;
};

export const timeReactComponent = <T extends React.Component>(dis: T) => {
  const start = new Date();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log("[TIMER]", dis["constructor"]["name"], new Date().getTime() - start.getTime() + "ms");
    });
  });
};

export const onInputChange = <T extends React.Component<{}, { values: any; errors: { [key: string]: string } }>>(
  dis: T,
  fieldName: string,
  { additionalOnChange }: { additionalOnChange?: (value, error) => any } = {}
) => {
  return ((value, error: string) => {
    dis.setState(
      {
        values: { ...dis.state.values, [fieldName]: value },
        errors: { ...dis.state.errors, [fieldName]: error }
      },
      () => {
        if (additionalOnChange) additionalOnChange(value, error);
      }
    );
  }).bind(dis);
};

export const changeHTMLElementInnerHTMLByID = (id: string, content: any) => {
  try {
    const des = document.getElementById(id);
    if (des) {
      const current = des.innerHTML;
      if (current !== content) {
        des.innerHTML = content;
      }
    }
  } catch (e) {}
};
export const changeHTMLElementContentByName = (name: string, content: string) => {
  try {
    const des = document.getElementsByName(name)[0];
    if (des) {
      const current = des.getAttribute("content");
      if (current !== content) {
        des.setAttribute("content", content);
      }
    }
  } catch (e) {}
};
export const changeHTMLElementContentById = (id: string, content: string) => {
  try {
    const des = document.getElementById(id);
    if (des) {
      const current = des.getAttribute("content");
      if (current !== content) {
        des.setAttribute("content", content);
      }
    }
  } catch (e) {}
};
export const sanitizeString = (str: string) => {
  if (!str) {
    return "";
  }
  return str.replace(/(&nbsp;|<([^>]+)>)/gm, "").replace(/[\"\']/gm, ``);
};
const defaultTitle = "Wine.Delivery: Enjoy free delivery island-wide for a wide range of wines in Singapore.";
let currentTitle = defaultTitle;
export const setPageTitle = (title: string) => {
  title = sanitizeString(title);
  changeHTMLElementInnerHTMLByID("title", title);
  changeHTMLElementContentById("ogTitle", title);
  currentTitle = title;
};

const defaultDescription =
  "Wine.Delivery is the premium marketplace to buy wine online in Singapore. Enjoy free delivery island-wide for a wide range of wines.";
let currentDescription = defaultDescription;
export const setPageDescription = (description: string) => {
  description = sanitizeString(description);
  if (!description) {
    description = defaultDescription;
  }
  changeHTMLElementContentByName("description", description);
  changeHTMLElementContentById("ogDescription", description);
  currentDescription = description;
};

const defaultOgImage = "https://wine.delivery/static/image/logo.png";
let currentOgImage = defaultOgImage;
export const setOgImage = (imageLink: string) => {
  imageLink = sanitizeString(imageLink);
  changeHTMLElementContentById("ogImage", imageLink);
  currentOgImage = imageLink;
};

const defaultSEOKeywords =
  "wine,wine delivery,wine delivery singapore,buy wine online,buy wine online singapore,wines,wine marketplace,wine singapore";
let currentSEOKeywords = defaultSEOKeywords;
export const setPageKeywords = (keywords: string) => {
  changeHTMLElementContentByName("keywords", keywords);
  currentSEOKeywords = keywords;
};

let currentStructuredData: any = {};
export const setStructuredData = (obj: any) => {
  changeHTMLElementInnerHTMLByID("structureData", JSON.stringify(obj, null, "\t"));
  currentStructuredData = obj;
};

export const focusSearchBar = () => {
  if (getResponsiveName() === "phone") {
    const node2: HTMLInputElement = document.getElementById("mobileSearch") as any;
    if (node2) {
      node2.click();
    }
  } else {
    const node: HTMLInputElement = document.getElementById("search") as any;
    if (node) {
      node.focus();
    }
  }
};

export const isIE = () => {
  if (!window.document) {
    return false;
  }
  return false || !!document["documentMode"];
};

let currentStatus = 200;
export const setStatus = (status: 200 | 404) => {
  currentStatus = status;
};

export const getStatus = () => {
  return currentStatus;
};

export const getUserAgent = () => {
  if (navigator && navigator.userAgent) {
    return navigator.userAgent;
  }
  return "";
};

export const isBot = () => {
  return /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(getUserAgent());
};

export const getDeviceType = () => {
  if (navigator && navigator.userAgent) {
    if (navigator.userAgent.indexOf("Android") >= 0) {
      return "android";
    } else if (navigator.userAgent.indexOf("iPhone") >= 0) {
      return "iphone";
    } else if (navigator.userAgent.indexOf("node") >= 0) {
      return "node.js";
    } else {
      return "browser";
    }
  }
  return "node.js";
};

export const openPage = (url: string) => {
  if (window) {
    window.open(url, "_blank");
  }
};

export const copyToClipboard = (str: string) => {
  const tempInput: HTMLInputElement = document.createElement("INPUT") as HTMLInputElement;
  document.body.appendChild(tempInput);
  tempInput.setAttribute("value", str);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};

export const loadScript = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const urlHash = hash(url);
    if (!document.getElementById(urlHash)) {
      var ele = document.createElement("script");
      ele.setAttribute("src", url);
      ele.addEventListener("load", () => {
        resolve();
      });
      ele.addEventListener("error", () => {
        reject();
      });
      ele.id = urlHash;
      document.body.appendChild(ele);
    } else {
      resolve();
    }
  });
};

export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window["opera"];
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window["MSStream"]) {
    return "iOS";
  }
  return null;
};
