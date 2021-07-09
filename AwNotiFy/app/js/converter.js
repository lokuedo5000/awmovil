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
let url = 'https://lokuedo5000.github.io/awmovil/AwNotiFy/json/db.json';
fetch(url)
  .then(res => res.json())
  .then((out) => {

    // Json add Datos
    document.querySelector("#jsonfile").value = JSON.stringify(out, null, 2);

    $('.setall').pagination({ // you call the plugin
      dataSource: out.home.sort(sort_by('id', true, parseInt)), // pass all the data
      pageSize: 8, // put how many items per page you want
      callback: function(data, pagination) {
        // data will be chunk of your data (json.Product) per page
        // that you need to display
        var wrapper = $('.setall #games').empty();
        $.each(data, function(i, f) {
          $('.setall #games').append(rows(f.titulo, f.fecha, f.cover, f.dcp));
        });
      }
    });

  })
  .catch(err => {
    throw err
  });

// add
function addJson(tipo) {

  const addView = document.querySelector("#jsonfile").value;

  let parseJson = JSON.parse(addView);

  document.querySelector("#id").value = parseJson.home.length + parseInt(1);
  // Fecha
  var fecha = new Date();
  document.querySelector("#fecha").value = formatoFecha(fecha, 'dd-mm-yyyy');

  scrolltop();

}



// add new json
function addnew() {
  // GET FORM
  var formSerialize = formElement => {
    const values = {};
    const inputs = formElement.elements;

    for (let i = 0; i < inputs.length; i++) {
      values[inputs[i].name] = inputs[i].value;
    }
    return values;
  }

  // Save
  const addSave = document.querySelector(".form_new");
  var getForm = formSerialize(addSave);

  const addView = document.querySelector("#jsonfile").value;

  let parseJson = JSON.parse(addView);

  parseJson.home.push(getForm);


  document.querySelector("#jsonfile").value = JSON.stringify(parseJson, null, 2);

  scrolltop();

  document.querySelector(".jsonclick").click();
}

// Ver
function clickfun(text) {
  scrolltop();
  // ocultar home
  var quitar_home = document.querySelector(".setall");
  quitar_home.classList.add('d-none');

  // ocultar view
  var ocultar_view = document.querySelector(".views");
  ocultar_view.classList.add('d-none');

  // mostrar view
  var ver_view = document.querySelector(".views");
  ver_view.classList.remove('d-none');

  // Script load Json
  let url = 'https://lokuedo5000.github.io/awmovil/AwNotiFy/json/db.json';
  fetch(url)
    .then(res => res.json())
    .then((out) => {
      var filter = out.home.filter(all => all.titulo == text);
      // Nombre
      $('.name_art').html(filter[0].titulo);

      // Nombre
      $('.fecha').html(filter[0].fecha);

      // Banner
      $('.banner_ver').attr('style', 'background-image: url(' + filter[0].cover + ');');

      // dcp
      $('.dcp').html(remplaNor(urlify($('.dcp').html())));

      // add codes
      var ver_data = $('.dcp').html();


      // heade
      var heade = `<div class="container-fluid nospace">
                    <div class="row">
                      <form class="col s12">
                        <h5>Codigo</h5>
                        <div class="row">`;

      // footer
      var footer = `</div>
                        </form>
                      </div>
                    </div>`;

      // Rem Heade
      var remhHeadeNew = ver_data.replace(/-\(-/g, heade);

      // Rem Footer
      var remhfooterNew = remhHeadeNew.replace(/-\)-/g, footer);

      // Rem Heade
      var remInput = remhfooterNew.replace(/\(-/g, '<input type="text" class="col s4 validate" maxlength="4" value="');

      // Rem Footer
      var setHtml = remInput.replace(/-\)/g, '">');

      $('.dcp').html(setHtml);



    })
    .catch(err => {
      throw err
    });
}

// Rows
function rows(name, fecha, cover, dcp) {
  return `<div class="card cardrows">
      <div class="card-image waves-effect waves-block waves-light">
        <div class="activator cover" style="background-image: url(${cover});">

        </div>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${name}<i class="cwI-chevron-up right"></i></span>
        <div class="datefecha">${fecha}</div>
        <p>${textShort(dcp, 90)}</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${name}<i class="cwI-close right"></i></span>
        <div class="datefecha">${fecha}</div>
        <p>${textShort(dcp, 200)}</p>
        <div class="btnleer">
        <div class="btn purple" onclick="clickfun('${name}')">Ver Mas</div>
        </div>
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
  document.querySelector("#autoComplete").value = '';


});

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    var veryHost = new URL(url);
    if (veryHost.hostname == 'i.imgur.com') {
      return `<img src="${url}" class="imgview z-depth-1">`;
    } else if (veryHost.hostname == 'www.youtube.com') {
      return `<div class="videoyt z-depth-1">
                <iframe src="https://www.youtube.com/embed/${veryHost.search.slice(3, 100)}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>`;
    } else {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    }

  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("searchform").addEventListener('submit', validarFormulario);
});

function validarFormulario(evento) {
  evento.preventDefault();
  var search = document.getElementById('autoComplete').value;
  if (search == 'add') {

    return;
  } else if (search.length == 0) {

    return;
  }

  this.submit();
}



/* Texto Normal */
function remplaNor(text) {
  return text.replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/<\(/g, "<h5 class='m-0'>")
    .replace(/\)>/g, "</h5>");
}

// Text Corto
function textShort(text, num) {
  if (text.length > num) {
    return text.slice(0, num) + '...';
  } else {
    return text;
  }
}


// get fecha
function formatoFecha(fecha, formato) {
  // const map = {
  //     dd: fecha.getDate(),
  //     mm: fecha.getMonth() + 1,
  //     yyyy: fecha.getFullYear()
  // }
  //
  // return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var year = fecha.getFullYear();



  var dates = dia + ' de ' + nombremes(mes) + ' ' + year;
  return dates;
}

// get nombre mes
function nombremes(mes) {
  // el mes letra
  if (mes == '1') {
    return 'Ene.';
  } else if (mes == '2') {
    return 'Feb.';
  } else if (mes == '3') {
    return 'Mar.';
  } else if (mes == '4') {
    return 'Abr.';
  } else if (mes == '5') {
    return 'May.';
  } else if (mes == '6') {
    return 'Jun.';
  } else if (mes == '7') {
    return 'Jul.';
  } else if (mes == '8') {
    return 'Ago.';
  } else if (mes == '9') {
    return 'Set.';
  } else if (mes == '10') {
    return 'Oct.';
  } else if (mes == '11') {
    return 'Nov.';
  } else if (mes == '12') {
    return 'Dic.';
  }
}
// scroll 0
function scrolltop() {
  $(this).scrollTop(0)
}
