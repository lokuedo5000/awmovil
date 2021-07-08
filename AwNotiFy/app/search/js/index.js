// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
  name: "food & drinks",
  data: {
    src: async function () {
      // Loading placeholder text
      // document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("https://lokuedo5000.github.io/appweb/awtorrentlite/db/games.json");
      const data = await source.json();

      // const alldata = await fetch("db-json/data.json");
      // const getdata = await alldata.json();
      // console.log(getdata);
      // Post Loading placeholder text
      // document.querySelector("#autoComplete").setAttribute("placeholder", autoCompleteJS.placeHolder);
      // Returns Fetched data
      return data.articulos;
    },
    key: ["nombre"],
    results: (list) => {
      // Filter duplicates
      const filteredResults = Array.from(new Set(list.map((value) => value.match))).map((food) => {
        return list.find((value) => value.match === food);
      });

      return filteredResults;
    },
  },
  trigger: {
    event: ["input", "focus"],
  },
  placeHolder: "Search",
  searchEngine: "strict",
  highlight: true,
  maxResults: 7,
  resultItem: {
    content: (data, element) => {
      // Modify Results Item Style
      element.style = "display: flex; justify-content: space-between;";
      // Modify Results Item Content
      element.innerHTML = `
        <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="clicktext">
            ${data.match}
        </span>
        <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
            ${'dn'}
        </span>`;
    },
  },
  noResults: (dataFeedback, generateList) => {
    // Generate autoComplete List
    // generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
    // // No Results List Item
    // const result = document.createElement("div");
    // result.setAttribute("class", "no_result");
    // result.setAttribute("tabindex", "1");
    // result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
    // document.querySelector(`#${autoCompleteJS.resultsList.idName}`).appendChild(result);
  },
  onSelection: (feedback) => {
    document.querySelector("#autoComplete").blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];

    document.querySelector("#autoComplete").value = selection;

    // Mostrar Art
    clickfun(selection);

    // ocultar home
    var quitar_home = document.querySelector(".setall");
    quitar_home.classList.add('d-none');

    // ocultar view
    var ocultar_view = document.querySelector(".views");
    ocultar_view.classList.add('d-none');

    // mostrar view
    var ver_view = document.querySelector(".views");
    ver_view.classList.remove('d-none');

    // console.log(rempla(textShort(selection, 20).toLowerCase()));



    function rempla(text) {
      return text.replace(/"/g, '-')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/'/g, '-')
        .replace(/\s+/g, '-');
    }

    function textShort(text, num) {
      if (text.length > num) {
        return text.slice(0, num) + '';
      } else {
        return text;
      }
    }

  },
});


// Toggle results list and other elements
const action = function (action) {
  const github = document.querySelector(".github-corner");
  const title = document.querySelector("h1");
  const mode = document.querySelector(".mode");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");

  if (action === "dim") {
    // github.style.opacity = 1;
    // title.style.opacity = 1;
    // mode.style.opacity = 1;
    // selection.style.opacity = 1;
    // footer.style.opacity = 1;
  } else {
    // github.style.opacity = 0.1;
    // title.style.opacity = 0.3;
    // mode.style.opacity = 0.2;
    // selection.style.opacity = 0.1;
    // footer.style.opacity = 0.1;
  }
};

// Toggle event for search input
// showing & hiding results list onfocus/blur
["focus", "blur"].forEach(function (eventType) {
  document.querySelector("#autoComplete").addEventListener(eventType, function () {
    // Hide results list & show other elements
    if (eventType === "blur") {
      action("dim");
    } else if (eventType === "focus") {
      // Show results list & hide other elements
      action("light");
    }
  });
});
