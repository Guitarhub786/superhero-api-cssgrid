const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.slug.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch('./superhero.json');
    hpCharacters = await res.json();
    console.log(hpCharacters)

    displayCharacters(hpCharacters);
  } catch (err) {
    console.error("Harry Potter Said", err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>${character.slug} <span>${character.biography.publisher}</span></p>
                <img src="${character.images.lg}"></img>
            </li>
        `;
    })
    .join('');
  charactersList.innerHTML = htmlString;
};

loadCharacters();