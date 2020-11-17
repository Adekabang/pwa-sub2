document.addEventListener("DOMContentLoaded", function () {
  // SIDEBAR NAVIGATION
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
          console.log("done");
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
          elm.addEventListener("click", (event) => {
            // Tutup sidenav
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1).replace("#", "");
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
  if (window.location.pathname === "/team.html") {
    page = "team";
  } else if (
    page == "" &&
    (window.location.pathname === "/" ||
      window.location.pathname === "/index.html")
  ) {
    page = "home";
  }
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector(".body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          const filepath = window.location.pathname;
          if (filepath === "/team.html") {
            // getTeamDetails();
          } else {
            if (page === "home") {
              getMatches();
            } else if (page === "teams") {
              getTeam();
            } else if (page === "favorite") {
              getFavoriteTeams();
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
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
});
