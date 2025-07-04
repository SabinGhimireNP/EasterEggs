var cornify_count = 0;

var cornify_add = function (options) {
  cornify_count += 1;
  var numType = "px";
  var windowHeight =
    window.innerHeight || document.documentElement.clientHeight || 768;
  var windowWidth =
    window.innerWidth || document.documentElement.clientWidth || 1024;
  var transform = "translate(-50%, -50%)";
  var showGrandUnicorn = cornify_count == 15;

  var div = document.createElement("div");
  div.style.position = "fixed";
  div.className = "__cornify_unicorn";
  div.style.zIndex = 143143;
  div.style.outline = 0;
  div.onclick = cornify_add;

  if (showGrandUnicorn) {
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.zIndex = 143143143;
  } else {
    div.style.top = Math.round(Math.random() * 100) + "%";
    div.style.left = Math.round(Math.random() * 100) + "%";
    transform += " rotate(" + Math.round(Math.random() * 10 - 5) + "deg)";
  }

  var img = document.createElement("img");
  img.style.opacity = 0;
  img.style.transition = "all .1s linear";
  img.alt = "A lovely unicorn or rainbow";
  img.onload = function () {
    img.style.opacity = 1;
  };

  var url = `https://www.cornify.com/corns/${
    Math.random() > 0.5 ? "r" : "u"
  }${Math.ceil(Math.random() * 7)}.gif`;

  if (options && (options.y || options.younicorns)) {
    url += "&y=" + (options.y ? options.y : options.younicorns);
    if (Math.random() > 0.5) transform += " scaleX(-1)";
  }

  div.style.transform = transform;
  div.style.MozTransform = transform;
  div.style.webkitTransform = transform;

  img.setAttribute("src", url);

  div.onmouseover = function () {
    var size = 1 + Math.round(Math.random() * 10) / 100;
    var angle = Math.round(Math.random() * 20 - 10);
    var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
    img.style.transform = result;
  };

  div.onmouseout = function () {
    var size = 0.9 + Math.round(Math.random() * 10) / 100;
    var angle = Math.round(Math.random() * 6 - 3);
    var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
    img.style.transform = result;
  };

  document.body.appendChild(div);
  div.appendChild(img);

  if (cornify_count == 5) {
    if (!document.getElementById("__cornify_css")) {
      var css = document.createElement("link");
      css.id = "__cornify_css";
      css.type = "text/css";
      css.rel = "stylesheet";
      css.href = "https://www.cornify.com/css/cornify.css";
      document.head.appendChild(css);
    }
    cornify_replace();
  }

  cornify_updatecount();

  document.dispatchEvent(new Event("cornify"));
};

var cornify_updatecount = function () {
  var id = "__cornify_count";
  var p = document.getElementById(id);

  if (!p) {
    p = document.createElement("p");
    p.id = id;
    p.style.position = "fixed";
    p.style.bottom = "5px";
    p.style.left = "0px";
    p.style.right = "0px";
    p.style.zIndex = "1000000000";
    p.style.color = "#ff00ff";
    p.style.textAlign = "center";
    p.style.fontSize = "24px";
    p.style.fontFamily = "'Comic Sans MS', 'Comic Sans', 'Marker Felt', serif";
    p.style.textTransform = "uppercase";
    document.body.appendChild(p);
  }

  p.innerHTML =
    cornify_count === 1
      ? "You cornified!"
      : "You cornified " + cornify_count + " times!";
};

var cornify_replace = function () {
  var words = [
    "Happy",
    "Sparkly",
    "Glittery",
    "Fun",
    "Magical",
    "Lovely",
    "Cute",
    "Charming",
    "Amazing",
    "Wonderful",
  ];
  for (var hc = 6; hc >= 1; hc--) {
    var headers = document.getElementsByTagName("h" + hc);
    for (var k = 0; k < headers.length; k++) {
      headers[k].innerHTML =
        words[Math.floor(Math.random() * words.length)] +
        " " +
        headers[k].innerHTML;
    }
  }
};

var cornify_click_cupcake_button = function () {
  var corns = document.getElementsByClassName("__cornify_unicorn");
  while (corns.length > 0) {
    corns[0].parentNode.removeChild(corns[0]);
  }

  var counter = document.getElementById("__cornify_count");
  if (counter) counter.remove();

  var button = document.getElementById("__cornify_cupcake_button");
  if (button) button.remove();

  document.dispatchEvent(new Event("cornify-clear"));
};

var cornify_add_cupcake_button = function () {
  if (document.getElementById("__cornify_cupcake_button")) return;

  var button = document.createElement("div");
  button.id = "__cornify_cupcake_button";
  button.onclick = cornify_click_cupcake_button;
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = 2147483640;

  var image = document.createElement("img");
  image.src = "https://www.cornify.com/assets/cornify-cupcake-button.png";
  image.alt = "Cupcake button";
  image.width = 50;
  image.height = 50;
  image.style.cursor = "pointer";

  button.appendChild(image);
  document.body.appendChild(button);
};

// Konami Code to trigger cornify (optional):
var cornami = {
  input: "",
  pattern: "38384040373937396665",
  clear: setTimeout(() => cornami.clear_input(), 5000),
  load: function () {
    document.onkeydown = function (event) {
      cornami.input += event.keyCode;
      if (cornami.input.includes(cornami.pattern)) {
        cornify_add();
      }
      clearTimeout(cornami.clear);
      cornami.clear = setTimeout(() => cornami.clear_input(), 5000);
    };
  },
  clear_input: function () {
    cornami.input = "";
    clearTimeout(cornami.clear);
  },
};

cornami.load();
