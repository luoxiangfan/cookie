import { CookieOptions, OptionalCookieOptions } from "./types";

const Cookies = {
  get: function (name: string) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$",
          ),
          "$1",
        ),
      ) || null
    );
  },
  set: function (
    ...args: [string, string, OptionalCookieOptions?] | [CookieOptions]
  ) {
    const [parameter1, parameter2, parameter3] = args;
    const length = args.length;
    let params: CookieOptions = {
      name: "",
      value: "",
    };
    if (length === 1) {
      params = parameter1 as CookieOptions;
    } else if (length === 2) {
      params = {
        name: parameter1 as string,
        value: parameter2!,
      };
    } else {
      params = {
        name: parameter1 as string,
        value: parameter2!,
        ...parameter3,
      };
    }
    const {
      name,
      value,
      path = "/",
      domain,
      sameSite,
      secure,
      expires,
      httpOnly,
      partitioned,
      priority,
    } = params;
    if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
      return false;
    }
    let sExpires = "";
    if (expires) {
      switch (expires.constructor) {
        // seconds
        case Number:
          sExpires =
            expires === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + expires;
          break;
        case String:
          sExpires = "; expires=" + expires;
          break;
        case Date:
          sExpires = "; expires=" + (expires as Date).toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      sExpires +
      (domain ? "; domain=" + domain : "") +
      (path ? "; path=" + path : "") +
      (secure ? "; secure" : "") +
      (sameSite
        ? typeof sameSite === "boolean"
          ? "; samesite=Strict"
          : "; samesite=" + sameSite
        : "") +
      (priority ? "; priority=" + priority : "") +
      (httpOnly ? "; httponly" : "") +
      (partitioned ? "; partitioned" : "");
    return true;
  },
  remove: function (name: string, path?: string, domain?: string) {
    if (!name || !this.has(name)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(name) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (domain ? "; domain=" + domain : "") +
      (path ? "; path=" + path : "");
    return true;
  },
  has: function (name: string) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\=",
    ).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};

export type { CookieOptions, OptionalCookieOptions };

export default Cookies;
