   "use strict";
function setCookie(dataname, datavalue) {
      var d = new Date();
      d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = dataname + "=" + datavalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                  c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                  let cookies = JSON.parse(c.substring(name.length, c.length))
                  let data = { finished: cookies.finished, stars: cookies.stars ? cookies.stars : [{ "level": 0, "count": 0, }], coins: cookies.coins }
                  return data
            }
      }
      return "";
}

function checkCookie() {

      let cookies = getCookie("data");
      if (cookies !== "") {
            return cookies
      } else {
            let data = { finished: 1, stars: [{ "level": 0, "count": 0, }], coins: 60 }
            setCookie("data", JSON.stringify(data));
      }
}