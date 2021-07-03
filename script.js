var cardsContainer = document.querySelector("#cards-container");
var currentUserName = "";

function getUserName(element) {
  //   console.log(element.value);
  currentUserName = element.value;
}

function makeCoderCard(data) {
  var card = `<div class="card">
    <img class="card-image" src="${data.avatar_url}" alt="${data.login}">
    <div class="card-body">
        <h3>${data.name}</h3>
        <h4>${data.login}</h4>
        <p>Location: ${data.location}</p>
        <p>Repositories: ${data.public_repos}</p>
    </div>
  </div>`;
  return card;
}

async function search() {
  var response = await fetch(
    "https://api.github.com/users/" + currentUserName + "/followers"
  );
  var coderFollowers = await response.json();

  console.log(coderFollowers);

  var followersArray = [];

  for (var i = 0; i < coderFollowers.length; i++) {
    followersArray.push(coderFollowers[i].login);
  }

  for (var j = 0; j < followersArray.length; j++) {
    var response = await fetch(
      `https://api.github.com/users/${followersArray[j]}`
    );
    var coderData = await response.json();
    cardsContainer.innerHTML =
      makeCoderCard(coderData) + cardsContainer.innerHTML;
  }

  console.log(followersArray);
}
