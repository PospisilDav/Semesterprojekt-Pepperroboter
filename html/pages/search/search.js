document.addEventListener("DOMContentLoaded", function () {
  // Core UI elements
  var searchInput = document.getElementById("searchInput");
  var searchButton = document.getElementById("searchButton");
  var resultsContainer = document.getElementById("resultsContainer");
  var avatarContainer = document.getElementById("avatarContainer");
  var logoSection = document.getElementById("logoSection");

  // Überarbeitete und benutzerfreundlichere Services für Bürger und Touristen
  var services = [
    // BÜRGERSERVICE - PERSÖNLICHE DOKUMENTE
    {
      id: 1,
      title: "Ausweis & Pass beantragen",
      bullets: ["Personalausweis", "Reisepass", "Express-Service"],
      category: "Persönliche Dokumente",
      keywords: [
        "Ausweis",
        "Personalausweis",
        "Reisepass",
        "ID",
        "Pass",
        "Dokument",
        "beantragen",
        "verlängern",
        "erneuern",
        "verloren",
        "gestohlen",
        "Urlaub",
        "Reise",
        "Ausland"
      ],
      link: "../guide-page/guide.html?amt=buergerservice",
      type: "buergerservice",
      serviceId: "personalausweis"
    },
    // BÜRGERSERVICE - PERSONALAUSWEIS (SPEZIFISCHER SERVICE)
    {
      id: 2,
      title: "Personalausweis beantragen",
      bullets: ["Beantragung", "Verlängerung", "Biometrisches Passbild benötigt"],
      category: "Bürgerservice",
      keywords: [
        "Ausweis",
        "Personalausweis",
        "ID",
        "beantragen", 
        "neu",
        "verlängern",
        "verloren",
        "gestohlen"
      ],
      link: "../citizen-services/citizen-sevices.html?service=personalausweis",
      type: "buergerservice",
      serviceId: "personalausweis"
    },
    // BÜRGERSERVICE - REISEPASS (SPEZIFISCHER SERVICE)
    {
      id: 3,
      title: "Reisepass beantragen",
      bullets: ["Standard-Reisepass", "Express-Service", "Für Auslandsreisen"],
      category: "Bürgerservice",
      keywords: [
        "Reisepass", 
        "Pass", 
        "Ausland", 
        "Reise", 
        "Urlaub", 
        "beantragen", 
        "express", 
        "schnell"
      ],
      link: "../citizen-services/citizen-sevices.html?service=reisepass",
      type: "buergerservice",
      serviceId: "reisepass"
    },
    // BÜRGERSERVICE - KFZ-ABMELDUNG
    {
      id: 4,
      title: "KFZ-Abmeldung",
      bullets: ["Fahrzeugabmeldung", "Außerbetriebsetzung", "Ummeldung"],
      category: "Fahrzeugangelegenheiten",
      keywords: [
        "KFZ", 
        "Auto", 
        "Fahrzeug", 
        "abmelden", 
        "Abmeldung", 
        "Außerbetriebsetzung", 
        "Zulassung"
      ],
      link: "../citizen-services/citizen-sevices.html?service=kfz",
      type: "buergerservice",
      serviceId: "kfz"
    },
    // BÜRGERSERVICE - FÜHRERSCHEIN
    {
      id: 5,
      title: "Führerscheinangelegenheiten",
      bullets: ["Antrag", "Umschreibung", "Internationaler Führerschein"],
      category: "Fahrzeugangelegenheiten",
      keywords: [
        "Führerschein", 
        "Fahrerlaubnis", 
        "beantragen", 
        "umschreiben", 
        "international"
      ],
      link: "../citizen-services/citizen-sevices.html?service=fuehrerschein",
      type: "buergerservice",
      serviceId: "fuehrerschein"
    },
    // BÜRGERSERVICE - MELDEWESEN
    {
      id: 6,
      title: "Meldeangelegenheiten",
      bullets: ["An-/Ummeldung", "Abmeldung", "Meldebescheinigung"],
      category: "Wohnen",
      keywords: [
        "Anmeldung", 
        "Ummeldung", 
        "Abmeldung", 
        "Wohnsitz", 
        "Umzug", 
        "Meldebescheinigung"
      ],
      link: "../citizen-services/citizen-sevices.html?service=meldewesen",
      type: "buergerservice",
      serviceId: "meldewesen"
    },
    // BÜRGERAMT/BÜRGERSERVICE ALLGEMEIN
    {
      id: 7,
      title: "Bürgerservice",
      bullets: ["Meldeamt", "Passamt", "Gewerbeamt", "KFZ-Abmeldung"],
      category: "Allgemeine Informationen",
      keywords: [
        "Bürgerservice", 
        "Bürgeramt", 
        "Öffnungszeiten", 
        "Kontakt", 
        "Rathaus"
      ],
      link: "../guide-page/guide.html?amt=buergerservice",
      type: "wegweiser",
      serviceId: "buergerservice"
    },
    // STANDESAMT
    {
      id: 8,
      title: "Standesamt",
      bullets: ["Eheschließungen", "Geburten", "Sterbefälle"],
      category: "Familienleben & Personenstand",
      keywords: [
        "Standesamt", 
        "Hochzeit", 
        "Ehe", 
        "Heirat", 
        "Geburt", 
        "Sterbefall", 
        "Kirchenaustritt"
      ],
      link: "../guide-page/guide.html?amt=standesamt",
      type: "wegweiser",
      serviceId: "standesamt"
    },
    // GEWERBEAMT
    {
      id: 9,
      title: "Gewerbeamt",
      bullets: ["Gewerbeanmeldung", "Gewerbeummeldung", "Gewerbeabmeldung"],
      category: "Wirtschaft & Gewerbe",
      keywords: [
        "Gewerbe", 
        "Firma", 
        "Selbständig", 
        "anmelden", 
        "ummelden", 
        "abmelden", 
        "Unternehmen"
      ],
      link: "../citizen-services/citizen-sevices.html?service=gewerbe",
      type: "buergerservice",
      serviceId: "gewerbe"
    },
    // BEGRÜSSUNGSGELD
    {
      id: 10,
      title: "Begrüßungsgeld",
      bullets: ["Für Neugeborene", "Antragstellung", "Leistungen"],
      category: "Familie & Soziales",
      keywords: [
        "Begrüßungsgeld", 
        "Neugeboren", 
        "Baby", 
        "Kind", 
        "Geld", 
        "Antrag"
      ],
      link: "../citizen-services/citizen-sevices.html?service=begruessungsgeld",
      type: "buergerservice",
      serviceId: "begruessungsgeld"
    },
    // INTEGRATIONSBEAUFTRAGTE
    {
      id: 11,
      title: "Integrationsbeauftragte",
      bullets: ["Unterbringung", "Beratung", "Verwaltung"],
      category: "Integration & Migration",
      keywords: [
        "Integration", 
        "Migration", 
        "Flüchtling", 
        "Ausländer", 
        "Unterstützung", 
        "Hilfe"
      ],
      link: "../guide-page/guide.html?amt=integrationsbeauftragte",
      type: "wegweiser",
      serviceId: "integrationsbeauftragte"
    },
    // ARBEITSAGENTUR
    {
      id: 12,
      title: "Agentur für Arbeit",
      bullets: ["Arbeitsvermittlung", "Beratung", "Arbeitssuche"],
      category: "Arbeit & Karriere",
      keywords: [
        "Arbeitsagentur", 
        "Arbeitsamt", 
        "Job", 
        "Arbeit", 
        "Arbeitslos", 
        "Vermittlung", 
        "Beratung"
      ],
      link: "../guide-page/guide.html?amt=arbeitsagentur",
      type: "wegweiser",
      serviceId: "arbeitsagentur"
    },
    // CITY-GUTSCHEINE
    {
      id: 13,
      title: "City-Gutscheine",
      bullets: ["Verkauf", "Einlösung", "Gültigkeitsdauer"],
      category: "Lokale Wirtschaft",
      keywords: [
        "Gutschein", 
        "City", 
        "Stadt", 
        "Geschenk", 
        "Einkaufen", 
        "lokal"
      ],
      link: "../citizen-services/citizen-sevices.html?service=gutscheine",
      type: "buergerservice",
      serviceId: "gutscheine"
    }
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

      // If there's exactly one result, redirect immediately
      if (filteredServices.length === 1) {
        var service = filteredServices[0];
        window.location.href = service.link;
        return;
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

          // Add service type indicator
          var typeLabel = service.type === "buergerservice" ? 
            '<span class="service-type buergerservice-type">Bürgerservice</span>' : 
            '<span class="service-type wegweiser-type">Wegweiser</span>';

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
            typeLabel +
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
