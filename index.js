const Cookies = {
  get: function (name) {
    return decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          "(?:(?:^|.*;)\\s*" +
          encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
          "\\s*\\=\\s*([^;]*).*$)|^.*$"
        ), "$1"
      )
    ) || null;
  },
  set: function (params) {
    const {
      name, value, path, domain,
      sameSite, secure, expires,
      httpOnly, partitioned, priority
    } = params
    if (
      !name ||
      /^(?:expires|max\-age|path|domain|secure)$/i.test(name)
    ) {
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
          sExpires = "; expires=" + expires.toUTCString();
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
      (sameSite ? "; samesite=" + sameSite : "") +
      (priority ? "; priority=" + priority : "") +
      (httpOnly ? "; httponly" : "") +
      (partitioned ? "; partitioned" : "");
    return true;
  },
  remove: function (name, path, domain) {
    if (!name || !this.hasItem(name)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(name) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      ( domain ? "; domain=" + domain : "") +
      ( path ? "; path=" + path : "");
    return true;
  },
  has: function (name) {
    return new RegExp(
      "(?:^|;\\s*)" +
      encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") +
      "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
}

export default Cookies