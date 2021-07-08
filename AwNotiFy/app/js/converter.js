// Ver como
var sort_by = (field, reverse, primer) => {

  const key = primer ?
    function(x) {
      return primer(x[field])
    } :
    function(x) {
      return x[field]
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}

// Script load Json
let url = 'https://lokuedo5000.github.io/appweb/awtorrentlite/db/games.json';
fetch(url)
  .then(res => res.json())
  .then((out) => {


    $('.setall').pagination({ // you call the plugin
      dataSource: out.articulos.sort(sort_by('id', true, parseInt)), // pass all the data
      pageSize: 8, // put how many items per page you want
      callback: function(data, pagination) {
        // data will be chunk of your data (json.Product) per page
        // that you need to display
        var wrapper = $('.setall #games').empty();
        $.each(data, function(i, f) {
          $('.setall #games').append(rows(f.titulo, f.cover, f.urls, f.trailer));
        });
      }
    });

  })
  .catch(err => {
    throw err
  });

// Ver
function clickfun(text) {
  // Script load Json
  let url = 'https://lokuedo5000.github.io/appweb/awtorrentlite/db/games.json';
  fetch(url)
    .then(res => res.json())
    .then((out) => {
      var filter = out.articulos.filter(all => all.nombre == text);
      // Nombre
      $('.name_art').html(filter[0].nombre);

      // Banner
      $('.banner_ver').attr('style', 'background-image: url(' + filter[0].cover + ');');

      // dcp
      $('.dcp').html(urlify($('.dcp').html()));
    })
    .catch(err => {
      throw err
    });
}

// Rows
function rows(name, cover, urls, trailer) {
  return `<div class="card cardrows">
      <div class="card-image waves-effect waves-block waves-light">
        <div class="activator cover" style="background-image: url(${cover});">

        </div>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${name}<i class="cwI-chevron-up right"></i></span>
        <p>Brothers: A Tale of Two Sons es un videojuego descargable con una historia basada...</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${name}<i class="cwI-close right"></i></span>
        <p>Brothers: A Tale of Two Sons es un videojuego descargable con una historia basada en una aventura con puzles y plataformas desarrollado por Starbreeze Studios y publicado por 505 Games, que fue lanzado el 7 de agosto de 2013 para la Xbox
          Live Arcade y el 3 de septiembre de 2013 para Steam y PlayStation Network</p>
      </div>
    </div>`;
}

// close
$('.close_views').click(function(event) {
  // ocultar home
  var quitar_home = document.querySelector(".setall");
  quitar_home.classList.remove('d-none');

  // ocultar view
  var ocultar_view = document.querySelector(".views");
  ocultar_view.classList.add('d-none');

  // limpiar input
  document.querySelector("#autoComplete").value='';


});

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    var veryHost = new URL(url);
    if (veryHost.hostname == 'i.imgur.com') {
      return `<img src="${url}" class="imgview z-depth-1">`;
    }else{
      return '<a href="' + url + '">' + url + '</a>';
    }

  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

console.log(window.location);



/* Texto Normal */
function remplaNor(text) {
  return text.replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/\(-/g, "<h5 class='m-0'>")
    .replace(/-\)/g, "</h5>");
}
