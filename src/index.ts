import type { CookieOptions, OptionalCookieOptions } from "./types";

const Cookies = {
  get: function (name?: string) {
    if (typeof document === "undefined" || (arguments.length && !name)) {
      return;
    }
    const cookies = document?.cookie?.split("; ") ?? [];
    const allCookies: Record<string, string> = {};
    for (const cookie of cookies) {
      const parts = cookie.split("=");
      const value = decodeURIComponent(parts.slice(1).join("="));
      const key = decodeURIComponent(parts[0]);
      if (!(key in allCookies)) {
        allCookies[key] = value;
      }
      if (name === key) {
        break;
      }
    }
    return name ? allCookies[name] : allCookies;
  },
  set: function (
    ...args: [string, string, OptionalCookieOptions?] | [CookieOptions]
  ) {
    const [param1, param2, param3] = args;
    const length = args.length;
    let params: CookieOptions = {
      name: "",
      value: "",
    };
    if (length === 1) {
      params = param1 as CookieOptions;
    } else if (length === 2) {
      params = {
        name: param1 as string,
        value: param2!,
      };
    } else {
      params = {
        name: param1 as string,
        value: param2!,
        ...param3,
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
    if (!name || typeof document === "undefined") {
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
  },
  remove: function (name: string, path?: string, domain?: string) {
    this.set(name, "", { path, domain, expires: -1 });
  },
  has: function (name: string) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\=",
    ).test(document.cookie);
  },
  keys: function () {
    return Object.keys(this.get()!);
  },
};

export type { CookieOptions, OptionalCookieOptions };

export default Cookies;
