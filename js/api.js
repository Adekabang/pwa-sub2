const base_url = "https://api.football-data.org/v2/";
const API_TOKEN = {
  headers: {
    "X-Auth-Token": "dd651dcdd86646b1b6eee0066bdd17ce",
  },
};
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getDate(timestampDate) {
  dateFormat = new Date(timestampDate);
  return dateFormat.toUTCString();
}

// Blok kode untuk melakukan request data json
function getMatches() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/matches?status=LIVE")
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            let dataHTML = "";
            if (data.matches.length === 0) {
              dataHTML += `<h5 class="center-align">No Match now</h5>`;
            } else {
              data.matches.reverse().forEach((match) => {
                dataHTML += `
          <div class="card">
            <div class="card-content center-align">
            <span class="card-title">
            <span>${getDate(match.utcDate)}</span>
            ${
              match.status === "IN_PLAY"
                ? `<span class="new badge red" data-badge-caption="">LIVE</span>`
                : `<span class="new badge blue" data-badge-caption="">${match.status}</span>`
            }
              </span>
            <div style="display: flex; justify-content: center; align-items: center;">
            
            <div>
              <img src="https://crests.football-data.org/${
                match.homeTeam.id
              }.svg" height=80 alt=""/>
              <h5>${match.homeTeam.name}</h5> 
            </div>
            <span>vs</span>
            <div>
            <img src="https://crests.football-data.org/${
              match.awayTeam.id
            }.svg" height=80 alt=""/>
            <h5>${match.awayTeam.name}</h5>
            </div>
            </div>
            <h4>
            ${
              match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : 0
            } - ${
                  match.score.fullTime.awayTeam
                    ? match.score.fullTime.awayTeam
                    : 0
                } 
            </h4>
              <hr/>
              <span>Last update : ${getDate(match.lastUpdated)}</span>
            </div>
          </div>`;
              });
            }
            document.getElementById("infolive").innerHTML = dataHTML;
          });
        }
      });
  }

  fetch(base_url + "competitions/2021/matches?status=LIVE", API_TOKEN)
    .then(status)
    .then(json)
    .then((data) => {
      let dataHTML = "";
      if (data.matches.length === 0) {
        dataHTML += `<h5 class="center-align">No Match now</h5>`;
      } else {
        data.matches.reverse().forEach((match) => {
          dataHTML += `
          <div class="card">
            <div class="card-content center-align">
            <span class="card-title">
            <span>${getDate(match.utcDate)}</span>
            ${
              match.status === "IN_PLAY"
                ? `<span class="new badge red" data-badge-caption="">LIVE</span>`
                : `<span class="new badge blue" data-badge-caption="">${match.status}</span>`
            }
              </span>
            <div style="display: flex; justify-content: center; align-items: center;">
            
            <div>
              <img src="https://crests.football-data.org/${
                match.homeTeam.id
              }.svg" height=80 alt=""/>
              <h5>${match.homeTeam.name}</h5> 
            </div>
            <span>vs</span>
            <div>
            <img src="https://crests.football-data.org/${
              match.awayTeam.id
            }.svg" height=80 alt=""/>
            <h5>${match.awayTeam.name}</h5>
            </div>
            </div>
            <h4>
            ${
              match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : 0
            } - ${
            match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : 0
          } 
            </h4>
              <hr/>
              <span>Last update : ${getDate(match.lastUpdated)}</span>
            </div>
          </div>`;
        });
      }
      document.getElementById("infolive").innerHTML = dataHTML;
    })
    .catch(error);
}

function getTeam() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/teams").then((response) => {
      if (response) {
        response.json().then((data) => {
          let dataHTML = "";
          data.teams.forEach((team) => {
            dataHTML += `
                <div class="col s12 m6 l4">
                <div class="card">
                  <div class="card-content " style="min-height: 250px">
                  <img class="" src="https://crests.football-data.org/${team.id}.svg" alt="${team.name}" style="height: 100px;">
                    <h6 class="card-title">${team.name}</h6>
                  </div>
                  <div class="card-action">
                  <a class="waves-effect waves-light btn purple darken-4" href="/team.html?id=${team.id}">Detail</a>
                  </div>
                </div>
              </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = dataHTML;
        });
      }
    });
  }
  fetch(base_url + "competitions/2021/teams", API_TOKEN)
    .then(status)
    .then(json)
    .then((data) => {
      let dataHTML = "";
      if (data.teams.length === 0) {
        dataHTML += `<h5 class="center-align">No Team here</h5>`;
      } else {
        data.teams.forEach((team) => {
          dataHTML += `
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-content " style="min-height: 250px">
        <img class="" src="https://crests.football-data.org/${team.id}.svg" alt="${team.name}" style="height: 100px;">
          <h6 class="card-title">${team.name}</h6>
        </div>
        <div class="card-action">
        <a class="waves-effect waves-light btn purple darken-4" href="/team.html?id=${team.id}">Detail</a>
        </div>
      </div>
    </div>
      `;
        });
      }
      document.getElementById("teams").innerHTML = dataHTML;
    })
    .catch(error);
}

function getTeamDetails() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            let playerList = "";
            data.squad.forEach((player) => {
              playerList += `<tr>
            <td>${player.name ? player.name : "-"}</td>
            <td>${player.position ? player.position : "-"}</td>
            <td>${player.nationality ? player.nationality : "-"}</td>
            </tr>`;
            });
            let teamHTML = `
          <h3>${data.shortName}</h3>
          <div class="col s12">
            <div>
              <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" height="300"/>
            </div>
            <div class="col s0 m4"></div>
            <div class="card col s12 m4">
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <a href="${data.website}">${data.website}</a>
                <p>${data.address}</p>
                <p>${data.phone}</p>
              </div>
            </div>
            <div class="col s0 m4"></div>
          </div>
            
          <div class="col s0 m3"></div>
          <div class="col s12 m6 container">
            <table class="highlight">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                ${playerList}
              </tbody>
            </table>
          </div>
          <div class="col s0 m3"></div>
            `;
            document.getElementById("team").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, API_TOKEN)
      .then(status)
      .then(json)
      .then((data) => {
        let playerList = "";
        data.squad.forEach((player) => {
          playerList += `<tr>
        <td>${player.name ? player.name : "-"}</td>
        <td>${player.position ? player.position : "-"}</td>
        <td>${player.nationality ? player.nationality : "-"}</td>
        </tr>`;
        });
        let teamHTML = `
      <h3>${data.shortName}</h3>
      <div class="col s12">
        <div>
          <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" height="300"/>
        </div>
        <div class="col s0 m4"></div>
        <div class="card col s12 m4">
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <a href="${data.website}">${data.website}</a>
            <p>${data.address}</p>
            <p>${data.phone}</p>
          </div>
        </div>
        <div class="col s0 m4"></div>
      </div>
        
      <div class="col s0 m3"></div>
      <div class="col s12 m6 container">
        <table class="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            ${playerList}
          </tbody>
        </table>
      </div>
      <div class="col s0 m3"></div>
        `;
        document.getElementById("team").innerHTML = teamHTML;
        resolve(data);
      });
  });
}

function getFavoriteTeams() {
  getAll().then((teams) => {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach((team) => {
      teamsHTML += `
                <div class="col s12 m6 l4">
                <div class="card">
                  <div class="card-content " style="min-height: 250px">
                  <img class="" src="https://crests.football-data.org/${team.id}.svg" alt="${team.name}" style="height: 100px;">
                    <h6 class="card-title">${team.name}</h6>
                  </div>
                  <div class="card-action">
                  <a class="waves-effect waves-light btn purple darken-4" href="/team.html?id=${team.id}&saved=true">Detail</a>
                  </div>
                </div>
              </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getFavoriteTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getById(idParam).then((data) => {
    console.log(data);
    let playerList = "";
    data.squad.forEach((player) => {
      playerList += `<tr>
            <td>${player.name ? player.name : "-"}</td>
            <td>${player.position ? player.position : "-"}</td>
            <td>${player.nationality ? player.nationality : "-"}</td>
            </tr>`;
    });
    let teamHTML = `
          <h3>${data.shortName}</h3>
          <div class="col s12">
            <div>
              <img src="https://crests.football-data.org/${data.id}.svg" alt="${data.name}" height="300"/>
            </div>
            <div class="col s0 m4"></div>
            <div class="card col s12 m4">
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <a href="${data.website}">${data.website}</a>
                <p>${data.address}</p>
                <p>${data.phone}</p>
              </div>
            </div>
            <div class="col s0 m4"></div>
          </div>
            
          <div class="col s0 m3"></div>
          <div class="col s12 m6 container">
            <table class="highlight">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                ${playerList}
              </tbody>
            </table>
          </div>
          <div class="col s0 m3"></div>
            `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("team").innerHTML = teamHTML;
  });
}
