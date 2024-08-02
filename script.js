import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'; // Importation de la bibliothèque Swiper pour les carrousels

function disableScroll() {
    document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden'; // Ajoute une sécurité supplémentaire
}

function enableScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.overflow = 'auto'; // Réactive le défilement
}


// Fonction pour initialiser le curseur personnalisé
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor'); // Sélectionne l'élément du curseur personnalisé
    const cursorFollow = document.querySelector('.custom-cursor-follow'); // Sélectionne l'élément qui suit le curseur
    const cursorSize = 20; // Définition de la taille du curseur
    const offset = cursorSize / 2; // Définition de l'offset pour centrer le curseur
    const delay = 50; // Définition du délai pour l'animation du curseur suiveur

    // Fonction pour déplacer le curseur en fonction de la position de la souris
    function moveCursor(e) {
        const x = e.clientX - offset; // Calcul de la position horizontale du curseur
        const y = e.clientY - offset; // Calcul de la position verticale du curseur
        cursor.style.left = `${x}px`; // Applique la position horizontale au curseur
        cursor.style.top = `${y}px`; // Applique la position verticale au curseur
        setTimeout(() => {
            cursorFollow.style.left = `${x}px`; // Applique la position horizontale au curseur suiveur après un délai
            cursorFollow.style.top = `${y}px`; // Applique la position verticale au curseur suiveur après un délai
        }, delay);
    }

    document.addEventListener('mousemove', moveCursor); // Ajoute un écouteur d'événements pour suivre les mouvements de la souris
    setupClickableElements(); // Configure les éléments cliquables initialement
}

// Fonction pour configurer les éléments cliquables
function setupClickableElements() {
    const cursor = document.querySelector('.custom-cursor'); // Sélectionne l'élément du curseur personnalisé
    const cursorFollow = document.querySelector('.custom-cursor-follow'); // Sélectionne l'élément qui suit le curseur
    const clickableElements = document.querySelectorAll('a, button, .cliquable, .hidden-links, #email-input, #logo, #modal-close'); // Sélectionne tous les éléments cliquables

    // Ajoute des écouteurs d'événements pour chaque élément cliquable
    clickableElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-hover'); // Ajoute une classe au curseur lorsque la souris survole un élément cliquable
            cursorFollow.classList.add('cursor-follow-hover'); // Ajoute une classe au curseur suiveur lorsque la souris survole un élément cliquable
        });

        element.addEventListener('mouseout', () => {
            cursor.classList.remove('cursor-hover'); // Retire la classe du curseur lorsque la souris quitte un élément cliquable
            cursorFollow.classList.remove('cursor-follow-hover'); // Retire la classe du curseur suiveur lorsque la souris quitte un élément cliquable
        });
    });
}

// Fonction pour initialiser les carrousels Swiper
function initSwiper() {
    const swiperBefore = new Swiper('.gallery-before', {
        navigation: {
            nextEl: '.gallery-before-next', // Sélectionne le bouton "suivant" pour ce carrousel
            prevEl: '.gallery-before-prev', // Sélectionne le bouton "précédent" pour ce carrousel
        },
        loop: false, // Désactive la boucle infinie pour ce carrousel
        spaceBetween: 50, // Définit l'espacement entre les diapositives
        slidesPerView: 2, // Définit le nombre de diapositives visibles en même temps
    });

    const swiperAfter = new Swiper('.gallery-after', {
        navigation: {
            nextEl: '.gallery-after-next', // Sélectionne le bouton "suivant" pour ce carrousel
            prevEl: '.gallery-after-prev', // Sélectionne le bouton "précédent" pour ce carrousel
        },
        loop: false, // Désactive la boucle infinie pour ce carrousel
        spaceBetween: 50, // Définit l'espacement entre les diapositives
        slidesPerView: 2, // Définit le nombre de diapositives visibles en même temps
    });

    // Empêche les actions par défaut sur les boutons de navigation du carrousel
    document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(button => {
        button.addEventListener('mousedown', event => {
            event.preventDefault(); // Empêche l'action par défaut lors d'un clic avec le bouton de la souris
        });
        button.addEventListener('click', event => {
            event.preventDefault(); // Empêche l'action par défaut lors d'un clic
        });
        button.addEventListener('dblclick', event => {
            event.preventDefault(); // Empêche l'action par défaut lors d'un double clic
        });
    });
}



// Fonction pour afficher le modal
function showModal(imgSrc) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    modal.style.display = "block";
    modalImg.src = imgSrc;
    disableScroll();
    console.log("no-scroll added");
}

// Fonction pour fermer le modal
function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
    enableScroll();
    console.log("no-scroll removed");
}

// Ajoutez des gestionnaires d'événements aux images
document.querySelectorAll(".clickable-image").forEach(img => {
    img.addEventListener("click", () => showModal(img.src));
});

// Ajoutez un gestionnaire d'événement pour fermer le modal
document.getElementById("modal-close").addEventListener("click", closeModal);

// Fermer le modal en cliquant en dehors de l'image
document.getElementById("image-modal").addEventListener("click", (event) => {
    if (event.target !== document.getElementById("modal-image")) {
        closeModal();
    }
});




// Fonction pour changer le logo en fonction de la position de la section
function setupLogoChangeOnPosition() {
    const logoElement = document.getElementById('logo'); // Sélectionne l'élément du logo
    const section1 = document.getElementById('section1'); // Sélectionne la section de référence
    const logoWhiteChangeSection = document.getElementById('image-text-section'); // Sélectionne la section logo-white-change
    const hiddenLinks = document.querySelector('.hidden-links'); // Sélectionne l'élément hidden-links
    const gradientSectionLogo = document.getElementById('white'); // Sélectionne l'élément hidden-links

    const logoWhite = 'images/logo_white_last.svg'; // Chemin du logo blanc
    const logoBlack = 'images/logo_black_last.svg'; // Chemin du logo noir

    let section1Visible = false;
    let logoWhiteChangeSectionVisible = false;
    let gradientSectionVisibleLogo = false;
    let changeTimeout;

    // Restaurer l'état du logo depuis localStorage
    const savedLogo = localStorage.getItem('currentLogo');
    if (savedLogo) {
        logoElement.src = savedLogo;
    }

    // Ajouter un écouteur d'événements pour le clic sur le lien du logo
    if (logoElement) {
        logoElement.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'http://127.0.0.1:5500/renault_6_der_valide/index.html';
        });
    }

    // Fonction pour changer la source du logo
    function changeLogo(newSrc) {
        if (logoElement.src.includes(newSrc)) return;
        logoElement.classList.add('logo-hidden');
        setTimeout(() => {
            logoElement.src = newSrc;
            logoElement.classList.remove('logo-hidden');
            // Enregistrer l'état du logo dans localStorage
            localStorage.setItem('currentLogo', newSrc);
        }, 0);
    }

    // Fonction pour mettre à jour le logo en fonction des états de visibilité
    function updateLogo() {
        if (section1Visible || logoWhiteChangeSectionVisible || !gradientSectionVisibleLogo) {
            changeLogo(logoWhite); // Change le logo en blanc si section1 ou logoWhiteChangeSection est visible
        } else {
            changeLogo(logoBlack); // Change le logo en noir si ni section1 ni logoWhiteChangeSection n'est visible
        }
    }

    // Fonction pour gérer le changement de la section avec un délai
    function handleChange(entries, observer) {
        entries.forEach(entry => {
            if (entry.target === section1) {
                section1Visible = entry.isIntersecting;
            } else if (entry.target === logoWhiteChangeSection) {
                logoWhiteChangeSectionVisible = entry.isIntersecting;
            } else if (entry.target === gradientSectionLogo) {
                gradientSectionVisibleLogo = entry.isIntersecting;
            }

            // Définir ou réinitialiser le timer
            clearTimeout(changeTimeout);
            changeTimeout = setTimeout(updateLogo, 100); // Délai de 100ms pour stabiliser les changements
        });
    }

    // Observateur pour section1 avec un seuil de 0.03
    const observerSection1 = new IntersectionObserver(handleChange, { threshold: 0.03 });

    // Observateur pour logoWhiteChangeSection avec un seuil de 0.9
    const observerWhiteChange = new IntersectionObserver(handleChange, { threshold: 0.9 });

    // Observateur pour gradientSectionLogo avec un seuil de 0.01
    const observerGradientSection = new IntersectionObserver(handleChange, { threshold: 0.01 });

    observerSection1.observe(section1); // Observe les changements d'intersection pour section1
    observerWhiteChange.observe(logoWhiteChangeSection); // Observe les changements d'intersection pour logo-white-change
    observerGradientSection.observe(gradientSectionLogo); // Observe les changements d'intersection pour gradient-section

    // Ajouter un écouteur d'événements pour hiddenLinks
    if (hiddenLinks && logoElement) {
        hiddenLinks.addEventListener('click', () => {
            changeLogo(logoWhite);
        });
    }
}

// Fonction pour gérer les éléments cachés et la navigation
function initHidden() {
    const hiddenLinks = document.querySelector('.hidden-links'); // Sélectionne les liens cachés
    const navList = document.querySelector('nav ul'); // Sélectionne la liste de navigation
    const nav = document.querySelector('nav'); // Sélectionne l'élément de navigation
    const mainSection = document.getElementById('nav-color-white'); // Sélectionne la section principale
    const whiteSection = document.getElementById('image-text-section'); // Sélectionne la nouvelle section pour le changement de couleur
    const gradientSection = document.getElementById('white'); // Sélectionne la nouvelle section pour le changement de couleur
    let isScrolling; // Déclare une variable pour gérer le défilement

    let mainSectionVisible = false;
    let whiteSectionVisible = false;
    let gradientSectionVisible = false;
    let changeTimeout;

    // Fonction pour vérifier la visibilité de la liste de navigation
    function checkNavListVisibility() {
        const navListBounding = navList.getBoundingClientRect(); // Obtient les coordonnées de la liste de navigation
        if (navListBounding.top >= 0 && navListBounding.bottom <= window.innerHeight) {
            hideNavList(); // Cache la liste de navigation si elle est complètement visible
            hiddenLinks.classList.remove('hover'); // Supprime la classe hover des liens cachés
        } else {
            showNavList(); // Affiche la liste de navigation si elle n'est pas complètement visible
        }
    }

    // Fonction pour cacher la liste de navigation
    function hideNavList() {
        hiddenLinks.querySelectorAll('.line').forEach(line => {
            line.classList.remove('spread-hover-back'); // Retire la classe spread-hover-back
            line.classList.remove('animate'); // Retire la classe animate
            line.classList.add('animate-back'); // Ajoute la classe animate-back
            line.addEventListener('animationend', function onAnimationEnd() {
                hiddenLinks.style.opacity = '0'; // Cache les liens cachés
                nav.classList.remove('nav-visible'); // Retire la classe nav-visible
                nav.classList.add('nav-hidden'); // Ajoute la classe nav-hidden
                line.classList.remove('animate-back'); // Retire la classe animate-back après l'animation
                line.removeEventListener('animationend', onAnimationEnd); // Retire l'écouteur d'événement après l'animation
            });
        });
    }

    // Fonction pour afficher la liste de navigation
    function showNavList() {
        hiddenLinks.style.opacity = '1'; // Affiche les liens cachés
        nav.classList.remove('nav-hidden'); // Retire la classe nav-hidden
        nav.classList.add('nav-visible'); // Ajoute la classe nav-visible
        hiddenLinks.querySelectorAll('.line').forEach(line => {
            line.classList.remove('animate-back'); // Retire la classe animate-back
            void line.offsetWidth; // Force le reflow pour redémarrer l'animation
            line.classList.add('animate'); // Ajoute la classe animate
        });
    }

    // Ajoute un gestionnaire d'événements de défilement
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling); // Réinitialise le timer de défilement
        isScrolling = setTimeout(checkNavListVisibility, 106); // Vérifie la visibilité après 106ms de pause
    });

    // Vérifie la visibilité initialement lorsque la page se charge
    window.addEventListener('load', () => {
        setTimeout(checkNavListVisibility, 100); // Vérifie la visibilité après 100ms
    });

    // Vérifie initialement la visibilité lorsque la page se charge
    checkNavListVisibility();

    // Fonction pour mettre à jour les classes des lignes en fonction des états de visibilité
    function updateHiddenLinks() {
        if (mainSectionVisible || whiteSectionVisible || !gradientSectionVisible) {
            hiddenLinks.querySelectorAll('.line').forEach(line => {
                line.classList.remove('black'); // Retire la classe black si mainSection et whiteSection sont visibles
            });
        } else {
            hiddenLinks.querySelectorAll('.line').forEach(line => {
                line.classList.add('black'); // Ajoute la classe black si mainSection et whiteSection ne sont pas visibles
            });
        }
    }

    // Fonction pour gérer la visibilité des sections avec un délai
    function handleVisibilityChange(entries, observer) {
        entries.forEach(entry => {
            if (entry.target === mainSection) {
                mainSectionVisible = entry.isIntersecting;
            } else if (entry.target === whiteSection) {
                whiteSectionVisible = entry.isIntersecting;
            } else if (entry.target === gradientSection) {
                gradientSectionVisible = entry.isIntersecting;
            }
            // Définir ou réinitialiser le timer
            clearTimeout(changeTimeout);
            changeTimeout = setTimeout(updateHiddenLinks, 100); // Délai de 100ms pour stabiliser les changements
        });
    }

    // Crée des observateurs pour mainSection et whiteSection avec des seuils différents
    const observerMainSection = new IntersectionObserver(handleVisibilityChange, { threshold: 0.01 });
    const observerWhiteSection = new IntersectionObserver(handleVisibilityChange, { threshold: 0.96 });

    observerMainSection.observe(mainSection); // Observe les changements d'intersection pour la section principale
    observerWhiteSection.observe(whiteSection); // Observe les changements d'intersection pour la section blanche
    observerMainSection.observe(gradientSection); // Observe les changements d'intersection pour la section principale



    





    hiddenLinks.addEventListener('click', () => {
        const url = hiddenLinks.getAttribute('data-url'); // Obtient l'URL à partir de l'attribut data-url
        if (url) {
            window.location.href = url; // Redirige vers l'URL si elle existe
        }
    });

    // Ajoute les gestionnaires d'événements pour le survol des hiddenLinks
    hiddenLinks.addEventListener('mouseover', () => {
        hiddenLinks.classList.add('hover'); // Ajoute la classe hover lors du survol
        hiddenLinks.querySelectorAll('.line').forEach(line => {
            line.classList.remove('spread-hover-back'); // Retire la classe spread-hover-back
            line.classList.add('spread-hover'); // Ajoute la classe spread-hover
        });
    });

    hiddenLinks.addEventListener('mouseout', () => {
        hiddenLinks.classList.remove('hover'); // Retire la classe hover lorsque la souris quitte
        hiddenLinks.querySelectorAll('.line').forEach(line => {
            line.classList.remove('spread-hover'); // Retire la classe spread-hover
            line.classList.add('spread-hover-back'); // Ajoute la classe spread-hover-back
        });
    });
}





// Fonction pour charger dynamiquement le contenu dans un conteneur
function loadContentIntoContainer(containerId, url) {
    fetch(url)
        .then(response => response.text()) // Récupère le contenu HTML de l'URL
        .then(html => {
            const container = document.getElementById(containerId);
            container.style.zIndex = 1000; // Augmente le z-index pour afficher le conteneur
            container.innerHTML = html; // Insère le contenu HTML dans le conteneur
            disableScroll(); // Désactive le défilement
            container.classList.add('loaded'); // Ajoute une classe pour afficher le conteneur chargé
            setupCloseButtons(); // Configure les boutons de fermeture
            setupClickableElements(); // Reconfigure les éléments cliquables après le chargement du nouveau contenu

            // Synchroniser les animations après la fin de l'animation de la page
            setTimeout(() => {
                const textItems = container.querySelectorAll('.text-item');
                textItems.forEach(item => {
                    item.classList.add('appear');
                });
                setupLinkRedirection(containerId); // Configurer la redirection des liens
            }, 1000); // Durée de la transition de la page
        });
}

// Fonction pour configurer le bouton de fermeture
function setupCloseButton(containerId) {
    const closeBtn = document.getElementById('close-btn'); // Sélectionne le bouton de fermeture
    if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche l'action par défaut du bouton
            const container = document.getElementById(containerId);
            const textItems = container.querySelectorAll('.text-item');
            enableScroll()
            // Ajouter les classes de disparition aux éléments de texte
            textItems.forEach(item => {
                item.classList.remove('appear'); // Retire la classe d'apparition
                item.classList.add('disappear'); // Ajoute la classe de disparition
            });
            setupLogoChangeOnPosition();
            // Attendre la fin de l'animation du texte avant de fermer la page
            const lastTextItem = textItems[textItems.length - 1];
            lastTextItem.addEventListener('animationend', () => {
                container.classList.remove('loaded'); // Retire la classe d'ouverture
                document.body.classList.remove('no-scroll'); // Retire la classe pour réactiver le défilement
                setTimeout(() => {
                    container.innerHTML = ''; // Vide le contenu du conteneur après un délai
                    container.style.zIndex = -1; // Réinitialise le z-index pour cacher le conteneur
                }, 1000); // Durée de la transition de la page
            }, { once: true });
        });
    }
}

// Fonction pour configurer le bouton de fermeture pour le conteneur avec animation d'opacité
function setupCloseButtonOpacity(containerId) {
    const closeBtn = document.querySelector(`#${containerId} .close-btn`); // Sélectionne le bouton de fermeture du conteneur spécifié
    if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche l'action par défaut du bouton
            const container = document.getElementById(containerId);

            // Ajouter la classe de fermeture pour déclencher l'animation de l'opacité
            container.classList.add('closing');

            // Attendre la fin de la transition de l'opacité avant de rediriger
            container.addEventListener('transitionend', () => {
                enableScroll();
                // Ajout d'un léger délai avant de vider le contenu et de réinitialiser le z-index
                setTimeout(() => {
                    container.innerHTML = ''; // Vide le contenu du conteneur
                    container.style.zIndex = -1; // Réinitialise le z-index pour cacher le conteneur
                    window.location.href = closeBtn.getAttribute('href'); // Redirige vers l'URL cible
                }, 100); // Délai de 100ms pour garantir que tout se passe correctement
            }, { once: true });
        });
    }
}

// Fonction pour configurer tous les boutons de fermeture
function setupCloseButtons() {
    setupCloseButton('page3-container'); // Configure le bouton de fermeture pour la page 3
    setupCloseButtonOpacity('page2-container'); // Configure le bouton de fermeture pour la page 2
}

// Fonction pour configurer la redirection des liens avec animation
function setupLinkRedirection(containerId) {
    const links = document.querySelectorAll('.text-item'); // Sélectionne tous les liens
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche l'action par défaut du lien
            const targetUrl = link.getAttribute('href'); // Obtient l'URL cible

            const container = document.getElementById(containerId);
            const textItems = container.querySelectorAll('.text-item');
            enableScroll()
            textItems.forEach(item => {
                item.classList.remove('appear'); // Retire la classe d'apparition
                item.classList.add('disappear'); // Ajoute la classe de disparition
            });

            // Attendre la fin de l'animation du texte avant de rediriger
            const lastTextItem = textItems[textItems.length - 1];
            lastTextItem.addEventListener('animationend', () => {
                container.classList.remove('loaded'); // Retire la classe d'ouverture
                document.body.classList.remove('no-scroll'); // Retire la classe pour réactiver le défilement
                setTimeout(() => {
                    window.location.href = targetUrl; // Redirige vers l'URL cible
                }, 1000); // Durée de la transition de la page
            }, { once: true });
        });
    });
}



function setupPageElements() {
    const gradientSection = document.getElementById('gradient-section');
    const imageTextSection = document.getElementById('image-text-section');
    const overlay = document.getElementById('overlay');
    const hiddenLinksFooter = document.querySelectorAll('.contact-link'); // Sélectionne tous les éléments .contact-link
    const hiddenLinksFooterMail = document.querySelectorAll('.footer-credit'); // Sélectionne tous les éléments .contact-link
    console.log('gradientSection:', gradientSection); // Log pour vérifier la sélection de l'élément
    console.log('imageTextSection:', imageTextSection); // Log pour vérifier la sélection de l'élément
    console.log('overlay:', overlay); // Log pour vérifier la sélection de l'élément overlay

    if (!gradientSection || !imageTextSection || !overlay) {
        console.error('Elements not found.'); // Affiche une erreur si les éléments ne sont pas trouvés
        return;
    }

    let imageTextSectionVisible = true;



    // Fonction pour gérer l'opacité de l'overlay et la couleur de fond en fonction du scroll
    function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const triggerPosition = document.body.scrollHeight * 0.98; // Déclencher à 98% de la hauteur totale du document
        const middlePosition = document.body.scrollHeight * 0.9;
        if (scrollPosition < triggerPosition) {
            overlay.style.opacity = "0";
            overlay.style.zIndex = -1;
            
            gradientSection.style.opacity = "0";
            hiddenLinksFooter.forEach(link => link.style.pointerEvents = 'none'); // Make the links non-clickable
            hiddenLinksFooterMail.forEach(link => link.style.pointerEvents = 'none'); // Make the links non-clickable
            console.log('Image text section not visible. Overlay and gradient section reset.');
        }
        if (scrollPosition > middlePosition) {
            
            overlay.style.opacity = "1";
            gradientSection.style.opacity = "1";
            overlay.style.zIndex = 1;
            hiddenLinksFooter.forEach(link => link.style.pointerEvents = 'auto'); // Make the links clickable again
            hiddenLinksFooterMail.forEach(link => link.style.pointerEvents = 'auto'); // Make the links clickable again
            if (scrollPosition >= triggerPosition) {
                overlay.classList.add('transparent-overlay-b');
                console.log('Scroll position:', scrollPosition, '-> Class "transparent-overlay-b" and "gray-background" added');
            } else {
                overlay.classList.remove('transparent-overlay-b');
                gradientSection.classList.remove('gray-background');
                console.log('Scroll position:', scrollPosition, '-> Class "transparent-overlay-b" and "gray-background" removed');
            }
        }
    }

    // Fonction pour gérer la visibilité de la section image-text
    function handleVisibilityChange(entries) {
        entries.forEach(entry => {
            if (entry.target === imageTextSection) {
                imageTextSectionVisible = entry.isIntersecting;
                console.log('Image text section visibility changed:', imageTextSectionVisible);
                handleScroll(); // Recalculer le défilement chaque fois que la visibilité change
            }
        });
    }

    // Options de l'observateur pour vérifier la visibilité à 30%
    const visibilityObserverOptions = {
        threshold: 0.3
    };

    // Crée l'observateur d'intersection pour la visibilité
    const visibilityObserver = new IntersectionObserver(handleVisibilityChange, visibilityObserverOptions);

    // Observe les changements d'intersection pour la section image-text
    visibilityObserver.observe(imageTextSection);

    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);

    // Appel initial pour définir l'état correct au chargement de la page
    handleScroll();

    // Ajoute les écouteurs d'événements pour charger dynamiquement les pages
    const playButton = document.getElementById('play-link'); // Sélectionne le bouton pour charger link.html
    if (playButton) {
        playButton.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche l'action par défaut du lien
            loadContentIntoContainer('page3-container', 'link.html'); // Charge link.html dans le conteneur page3-container
        });
    }

    const videoButton = document.getElementById('play'); // Sélectionne le bouton pour charger video-1.html
    if (videoButton) {
        videoButton.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche l'action par défaut du lien
            loadContentIntoContainer('page2-container', 'video-1.html'); // Charge video-1.html dans le conteneur page2-container
        });
    }

    // Fonction pour gérer la division de l'image et afficher la vidéo
    const circlePlayButton = document.querySelector('.circle-play');
    const imageContainer = document.getElementById('image-container');
    const leftHalf = document.querySelector('.left-half');
    const rightHalf = document.querySelector('.right-half');
    const videoContainer = document.getElementById('video-container-split');
    const circleContainer = document.getElementById('circle-container'); // Sélectionne le conteneur du cercle

    // Initialement, cacher le conteneur vidéo
    videoContainer.style.opacity = 1;

    // Ajouter l'événement de clic au bouton de lecture
    circlePlayButton.addEventListener('click', () => {
        // Ajouter les classes pour diviser l'image
        leftHalf.classList.add('split-left');
        rightHalf.classList.add('split-right');
        circleContainer.classList.add('fade-out'); // Ajouter la classe pour déplacer le cercle

        // Attendre la fin de l'animation avant d'afficher la vidéo
        setTimeout(() => {
            imageContainer.classList.add('hide'); // Cacher l'image divisée
            videoContainer.style.opacity = 1; // Afficher le conteneur vidéo
            videoContainer.style.zIndex = 20000; // Augmenter le z-index du conteneur vidéo pour le rendre cliquable
        }, 1000); // La durée de l'animation doit correspondre à celle définie dans le CSS
    });



}


// Fonction d'initialisation principale
function init() {

    
    if (document.querySelector('.custom-cursor')) {
        initCustomCursor(); // Initialise le curseur personnalisé si l'élément existe
    }
    if (document.querySelector('.swiper-container')) {
        initSwiper(); // Initialise les carrousels Swiper si les éléments existent
    }
    setupLogoChangeOnPosition(); // Configure le changement de logo en fonction de la position
    initHidden(); // Initialise les éléments cachés et la navigation
    
    setupPageElements();
}

document.addEventListener('DOMContentLoaded', init); // Initialise les fonctions lorsque le DOM est complètement chargé
