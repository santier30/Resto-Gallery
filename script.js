const Article = document.getElementById('restaurant-gallery');
const searchBar = document.getElementById("search");
fetch('./images.JSON')
.then(response => response.json())
.then(galleryData => {

  galleryData.forEach(function(image) {

    var img = document.createElement('img');
    img.src = image.url;
    img.alt = image.name;
    img.title = image.name;
    img.className = "Restos"
// Se podría agregar el URL de la página de los diferentes restaurantes, suponiendo que estuvieran en la base de datos
    
    Article.appendChild(img);
  });
})
.catch(error => console.error(error));



searchBar.addEventListener("input", display);//Lo hice con un oninput porque el JSON no proviene de una base de datos y no tarda en hacer el fetch. Si fuera así, en mi opinión, sería mejor poner un botón, hacer un onsubmit o, en su defecto, poner un setTimeout para que solo busque después de que la persona termine de escribir

function display() {
  const inputValue = searchBar.value;
  const regex = new RegExp(inputValue.replace(/\s+/g, '\\s*'), 'i');
  
  fetch('./images.JSON')
    .then(response => response.json())
    .then(galleryData => {

      while (Article.firstChild) {
        Article.removeChild(Article.firstChild);
      }// No sé cuál sería mejor, pero también se me ocurrió así "Article.innerHTML = '';" pero leí que era poco seguro porque podía correr código malicioso. Si hay otra forma mejor, me gustaría saber.
      
      galleryData.forEach(function(image) {
        if (regex.test(image.name.replace(/\s/g, ""))) { //No es un sistema de búsqueda ideal, es mejorable.
          var img = document.createElement('img');
          img.src = image.url;
          img.alt = image.name;
          img.title = image.name;
          img.className = "Restos";
          Article.appendChild(img);
        }
      });
    })
    .catch(error => console.error(error));
}





searchBar.addEventListener("input", display);

