document.addEventListener("DOMContentLoaded", function () {
  // Core UI elements
  var searchInput = document.getElementById("searchInput");
  var searchButton = document.getElementById("searchButton");
  var resultsContainer = document.getElementById("resultsContainer");
  var avatarContainer = document.getElementById("avatarContainer");
  var logoSection = document.getElementById("logoSection");

  // Service data with categories and search keywords
  var services = [
    {
      id: 1,
      title: "Fachbereichsleitung",
      bullets: ["Wahlen", "Verwaltung", "Koordination"],
      category: "Verwaltung",
      keywords: [
        "Leitung",
        "Amt",
        "Büro",
        "Direktion",
        "Management",
        "Kommunalwahl",
        "Gemeindewahl",
      ],
      link: "../guide-page/guide.html?amt=fachbereichsleitung",
    },
    {
      id: 2,
      title: "Bürgerservice",
      bullets: [
        "Ausweise & Anmeldungen",
        "Gewerbe & Fahrzeuge",
        "Finanzielle Hilfen",
      ],
      category: "Bürgerservice",
      keywords: [
        "Bürgerbüro",
        "Einwohner",
        "Bürger",
        "Dokumente",
        "KFZ",
        "Auto",
        "Geld",
        "Hilfe",
        "Beratung",
        "Antrag",
      ],
      link: "../guide-page/guide.html?amt=buergerservice",
    },
    {
      id: 3,
      title: "Standesamt",
      bullets: ["Geburt & Tod", "Heirat", "Kirchenaustritt & Namensänderung"],
      category: "Personenstand",
      keywords: [
        "Hochzeit",
        "Geburtsurkunde",
        "Sterbeurkunde",
        "Ehe",
        "Heiraten",
        "Name ändern",
        "Baby",
        "Kirche",
        "Religion",
      ],
      link: "../guide-page/guide.html?amt=standesamt",
    },
    {
      id: 4,
      title: "Stellv. Fachbereichsleitung",
      bullets: ["Ordnungsamt", "Sondernutzungen", "Verkehrsrecht"],
      category: "Verwaltung",
      keywords: [
        "Stellvertretung",
        "Ordnung",
        "Verkehr",
        "Straße",
        "Genehmigung",
        "Erlaubnis",
        "Antrag",
      ],
      link: "../guide-page/guide.html?amt=stellvfachbereichsleitung",
    },
    {
      id: 5,
      title: "Gemeindevollzugsdienst",
      bullets: [
        "Parkkontrollen",
        "Märkte & Veranstaltungen",
        "Vollstreckungen",
      ],
      category: "Ordnung",
      keywords: [
        "Ordnungsamt",
        "Parken",
        "Knöllchen",
        "Markt",
        "Wochenmarkt",
        "Strafe",
        "Bußgeld",
        "GVD",
        "Kontrolle",
      ],
      link: "../guide-page/guide.html?amt=gemeindevollzugsdienst",
    },
    {
      id: 6,
      title: "Integrationsbeauftragte",
      bullets: [
        "Wohnungen für Geflüchtete",
        "Planung der Integration",
        "Organisation der Hilfsangebote",
      ],
      category: "Integration",
      keywords: [
        "Flüchtlinge",
        "Asyl",
        "Migration",
        "Ausländer",
        "Unterkunft",
        "Wohnen",
        "Hilfe",
        "Unterstützung",
      ],
      link: "../guide-page/guide.html?amt=integrationsbeauftragte",
    },
    {
      id: 7,
      title: "Integrationsmanagement",
      bullets: [
        "Beratung für Geflüchtete",
        "Hilfe bei Anträgen und Ämtern",
        "Unterstützung: Schule und Gesundheit",
      ],
      category: "Integration",
      keywords: [
        "Flüchtlinge",
        "Asyl",
        "Migranten",
        "Hilfe",
        "Anträge",
        "Formulare",
        "Beratung",
        "Schule",
        "Arzt",
        "Gesundheit",
      ],
      link: "../guide-page/guide.html?amt=integrationsmanagement",
    },
    {
      id: 8,
      title: "Agentur für Arbeit",
      bullets: ["Arbeitsvermittlung", "Hilfe bei Jobsuche", "Nur mit Termin"],
      category: "Arbeit",
      keywords: [
        "Arbeitsamt",
        "Arbeitslos",
        "Jobcenter",
        "Stelle",
        "Beruf",
        "Vermittlung",
        "ALG",
        "Arbeitslosengeld",
        "Termin",
      ],
      link: "../guide-page/guide.html?amt=arbeitsagentur",
    },
    {
      id: 9,
      title: "Meldeamt",
      bullets: ["Wohnung anmelden", "Personalausweis", "Meldebescheinigungen"],
      category: "Bürgerservice",
      keywords: [
        "Anmeldung",
        "Ummeldung",
        "Abmeldung",
        "Wohnsitz",
        "Adresse",
        "Umzug",
        "Ausweis",
        "Bescheinigung",
      ],
      link: "../guide-page/guide.html?amt=buergerservice", // Redirected to Bürgerservice which handles these services
    },
    {
      id: 10,
      title: "Gewerbeamt",
      bullets: ["Gewerbe anmelden", "Gewerbe ändern", "Gewerbe abmelden"],
      category: "Wirtschaft",
      keywords: [
        "Firma",
        "Unternehmen",
        "Betrieb",
        "Selbständig",
        "Gewerbe",
        "Business",
        "Anmeldung",
        "Gewerbeschein",
      ],
      link: "../guide-page/guide.html?amt=buergerservice", // Redirected to Bürgerservice which handles these services
    },
    {
      id: 11,
      title: "Passamt",
      bullets: ["Reisepass", "Personalausweis", "Vorläufige Dokumente"],
      category: "Bürgerservice",
      keywords: [
        "Pass",
        "Ausweis",
        "ID",
        "Identität",
        "Dokument",
        "Reise",
        "Passbild",
        "Urlaub",
        "Ausland",
      ],
      link: "../guide-page/guide.html?amt=buergerservice", // Redirected to Bürgerservice which handles these services
    },
    {
      id: 12,
      title: "Sozialamt",
      bullets: [
        "Finanzielle Unterstützung",
        "Hilfe in Notlagen",
        "Wohnungsangelegenheiten",
      ],
      category: "Sozialdienste",
      keywords: [
        "Sozialhilfe",
        "Geld",
        "Unterstützung",
        "Not",
        "Wohngeld",
        "Armut",
        "Hilfe",
        "Beratung",
        "Wohnung",
        "Obdach",
      ],
      link: "../guide-page/guide.html?amt=buergerservice", // Redirected to Bürgerservice which handles social services
    },
  ];

  // UI element interactions
  if (avatarContainer) {
    avatarContainer.addEventListener("click", function () {
      this.classList.add("clicked");
      var self = this;
      setTimeout(function () {
        self.classList.remove("clicked");
      }, 800);
    });
  }

  if (logoSection) {
    logoSection.addEventListener("click", function () {
      this.classList.add("clicked");
      var self = this;
      setTimeout(function () {
        self.classList.remove("clicked");
      }, 500);
      window.location.href = "../../index.html";
    });
  }

  // Search implementation
  function performSearch() {
    var searchTerm = searchInput.value.trim().toLowerCase();

    // Display loading state
    resultsContainer.innerHTML =
      '<div class="loading-indicator" style="display: block;">' +
      '<div class="loading-spinner"></div>' +
      '<div class="loading-text">Suche läuft...</div>' +
      "</div>";

    // Short delay for better UX
    setTimeout(function () {
      var filteredServices;

      if (searchTerm === "") {
        filteredServices = services;
      } else {
        filteredServices = services.filter(function (service) {
          // Match against title or category
          if (
            service.title.toLowerCase().indexOf(searchTerm) !== -1 ||
            service.category.toLowerCase().indexOf(searchTerm) !== -1
          ) {
            return true;
          }

          // Match against bullet points
          for (var i = 0; i < service.bullets.length; i++) {
            if (service.bullets[i].toLowerCase().indexOf(searchTerm) !== -1) {
              return true;
            }
          }

          // Match against keywords
          if (service.keywords) {
            for (var j = 0; j < service.keywords.length; j++) {
              if (service.keywords[j].toLowerCase().indexOf(searchTerm) !== -1) {
                return true;
              }
            }
          }

          return false;
        });
      }

      displayResults(filteredServices, searchTerm);
    }, 500);
  }

  function displayResults(results, searchTerm) {
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML =
        '<div class="no-results">Keine Ergebnisse gefunden</div>';
      return;
    }

    // Carousel container setup
    var carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-container";

    var slidesContainer = document.createElement("div");
    slidesContainer.className = "carousel-slides";

    // Navigation controls
    var prevButton = document.createElement("button");
    prevButton.className = "carousel-nav prev-button";
    prevButton.innerHTML = "&#10094;";

    var nextButton = document.createElement("button");
    nextButton.className = "carousel-nav next-button";
    nextButton.innerHTML = "&#10095;";

    // Responsive layout calculation
    var cardsPerSlide = window.innerWidth < 768 ? 1 : 3;
    var totalSlides = Math.ceil(results.length / cardsPerSlide);

    // Create individual slides
    for (var slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
      var slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.style.transform = "translateX(" + slideIndex * 100 + "%)";

      // Populate slide with service cards
      for (var cardIndex = 0; cardIndex < cardsPerSlide; cardIndex++) {
        var serviceIndex = slideIndex * cardsPerSlide + cardIndex;

        if (serviceIndex < results.length) {
          var service = results[serviceIndex];

          var highlightedTitle = highlightMatch(service.title, searchTerm);

          // Format bullet points with highlights
          var bulletsHtml = '<ul class="service-bullets">';
          for (var j = 0; j < service.bullets.length; j++) {
            bulletsHtml +=
              "<li>" + highlightMatch(service.bullets[j], searchTerm) + "</li>";
          }
          bulletsHtml += "</ul>";

          // Build card element
          var cardElement = document.createElement("div");
          cardElement.className =
            "card card-template-" + ((serviceIndex % 3) + 1);
          cardElement.style.animationDelay = serviceIndex * 0.1 + "s";

          cardElement.innerHTML =
            '<div class="card-header">' +
            '  <h2 class="card-title">' +
            highlightedTitle +
            "</h2>" +
            "</div>" +
            '<div class="card-content">' +
            bulletsHtml +
            '  <p class="service-category">Kategorie: ' +
            service.category +
            "</p>" +
            "</div>" +
            '<div class="card-footer">' +
            '  <div class="show-button">' +
            '    <span class="show-button-icon">' +
            '      <img src="../../assets/icons/arrow_right.svg" alt="Details anzeigen" class="arrow-icon">' +
            "    </span>" +
            "  </div>" +
            "</div>";

          // Link card to service details
          (function (serviceLink) {
            cardElement.addEventListener("click", function () {
              this.classList.add("clicked");
              var cardElement = this;

              setTimeout(function () {
                window.location.href = serviceLink;
              }, 800);
            });
          })(service.link);

          slide.appendChild(cardElement);
        }
      }

      slidesContainer.appendChild(slide);
    }

    // Build complete carousel
    carouselContainer.appendChild(slidesContainer);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    resultsContainer.appendChild(carouselContainer);

    initCarousel();
  }

  function initCarousel() {
    var currentSlide = 0;
    var slides = document.querySelectorAll(".carousel-slide");
    var prevButton = document.querySelector(".prev-button");
    var nextButton = document.querySelector(".next-button");

    // Initial button state
    prevButton.style.opacity = "0.5";
    prevButton.style.cursor = "not-allowed";

    // Hide navigation for single slide
    if (slides.length <= 1) {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
    }

    function updateCarousel() {
      // Update slide positions
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.transform =
          "translateX(" + (i - currentSlide) * 100 + "%)";
      }

      // Update navigation states
      prevButton.style.opacity = currentSlide === 0 ? "0.5" : "1";
      prevButton.style.cursor = currentSlide === 0 ? "not-allowed" : "pointer";

      nextButton.style.opacity =
        currentSlide === slides.length - 1 ? "0.5" : "1";
      nextButton.style.cursor =
        currentSlide === slides.length - 1 ? "not-allowed" : "pointer";
    }

    // Navigation controls
    prevButton.addEventListener("click", function () {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    nextButton.addEventListener("click", function () {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateCarousel();
      }
    });
  }

  function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;

    var regex = new RegExp("(" + searchTerm + ")", "gi");
    return text.replace(regex, '<span class="result-highlight">$1</span>');
  }

  // Event bindings
  if (searchButton) {
    searchButton.addEventListener("click", performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        performSearch();
      }
    });

    searchInput.focus();
  }

  // Visual feedback
  document.addEventListener("click", function (e) {
    var target = e.target;

    while (target && !target.classList.contains("card")) {
      target = target.parentElement;
    }

    if (target) {
      var rect = target.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      target.appendChild(ripple);

      setTimeout(function () {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    }
  });
});
