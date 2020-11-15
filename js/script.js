document.addEventListener("DOMContentLoaded", function () {
  // SIDEBAR NAVIGATION
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target
                .getAttribute("href")
                .substr(1)
                .replace("#", "");
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1).replace("#", "");
  if (window.location.pathname == "/team.html") {
    page = "team";
  } else if (
    page == "" &&
    (window.location.pathname == "/" ||
      window.location.pathname == "/index.html")
  ) {
    page = "home";
  }
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector(".body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          var filepath = window.location.pathname;
          if (filepath === "/team.html") {
            getTeamDetails();
          } else {
            if (page == "home") {
              getMatches();
            } else if (page == "teams") {
              getTeam();
            }
          }
          M.AutoInit();
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    console.log(page);
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
