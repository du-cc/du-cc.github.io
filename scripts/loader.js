// topbar loader
var topbar;

fetch("/elements/topbar.html")
  .then((response) => response.text())
  .then((data) => {
    topbar = new DOMParser()
      .parseFromString(data, "text/html")
      .querySelector(".topbar");

    if (!window.location.href.includes("index/")) {
      topbar.querySelector("i").style.display = "none";
    }

    document.body.prepend(topbar);
  });
