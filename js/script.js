const participantsData = [
    { img: "./images/image-card.png", name: "Хосе-Рауль Капабланка", description: "Чемпион мира по шахматам" },
    { img: "./images/image-card.png", name: "Эммануил Ласкер", description: "Чемпион мира по шахматам" },
    { img: "./images/image-card.png", name: "Александр Алехин", description: "Чемпион мира по шахматам" },
    { img: "./images/image-card.png", name: "Арон Нимцович ", description: "Чемпион мира по шахматам" },
    { img: "./images/image-card.png", name: "Рихард Рети", description: "Чемпион мира по шахматам" },
    { img: "./images/image-card.png", name: "Остап Бендер", description: "Гроссмейстер" },
];

const participantsContainer = document.getElementById("participants");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselInfo = document.getElementById("carouselInfo");

let currentIndex = 0;
let totalViewed = 0;  
let autoSlideInterval;


function calculateVisibleCards() {
    const containerWidth = participantsContainer.offsetWidth;

   
    const cardWidth = window.innerWidth <= 435 ? 300 : 395;

    return Math.floor(containerWidth / cardWidth);
}

function createCard(participant) {
    const card = document.createElement("div");
    card.classList.add("participants__card");

    const img = document.createElement("img");
    img.src = participant.img;
    img.alt = participant.name;
    card.appendChild(img);

    const name = document.createElement("b");
    name.textContent = participant.name;
    card.appendChild(name);

    const description = document.createElement("p");
    description.textContent = participant.description;
    card.appendChild(description);

    const button = document.createElement("button");
    button.classList.add("carouse-button");
    button.textContent = "Подробнее";
    card.appendChild(button);

    return card;
}


function updateCarousel() {
    const cardsVisible = calculateVisibleCards();
    participantsContainer.innerHTML = '';
    const endIndex = currentIndex + cardsVisible;

    for (let i = 0; i < cardsVisible; i++) {
        const index = (currentIndex + i) % participantsData.length; 
        participantsContainer.appendChild(createCard(participantsData[index]));
    }

    const viewedCards = Math.min(currentIndex + cardsVisible, participantsData.length);

   
    const viewedCardsElement = document.createElement('span');
    viewedCardsElement.textContent = viewedCards;
    viewedCardsElement.classList.add('viewed-cards'); 

    const totalParticipantsElement = document.createElement('span');
    totalParticipantsElement.textContent = participantsData.length;
    totalParticipantsElement.classList.add('total-participants'); 

  
    carouselInfo.innerHTML = ''; 
    carouselInfo.appendChild(viewedCardsElement);
    carouselInfo.append(' / '); 
    carouselInfo.appendChild(totalParticipantsElement);
}




function startAutoSlide() {
    stopAutoSlide(); 
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000); 
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}


function nextSlide() {
    const cardsVisible = calculateVisibleCards();
    currentIndex = (currentIndex + cardsVisible) % participantsData.length; 
    totalViewed = Math.min(currentIndex + cardsVisible, participantsData.length); 
    updateCarousel();
}


function prevSlide() {
    const cardsVisible = calculateVisibleCards();
    currentIndex = (currentIndex - cardsVisible + participantsData.length) % participantsData.length; 
    totalViewed = Math.min(currentIndex + cardsVisible, participantsData.length); 
    updateCarousel();
}


prevButton.addEventListener("click", () => {
    prevSlide();
    startAutoSlide(); 
});

nextButton.addEventListener("click", () => {
    nextSlide();
    startAutoSlide(); 
});


window.addEventListener("resize", updateCarousel);


updateCarousel();
startAutoSlide();

  

  
  
document.addEventListener("DOMContentLoaded", () => {
    const setupCarousel = () => {
      const grid = document.querySelector(".stages__grid");
  
      if (window.innerWidth <= 882 && grid) {
        const items = Array.from(grid.children);
  

        grid.innerHTML = "";
  
        // Создание групп
        const groups = [
          [items[0], items[1]], 
          [items[2]],           
          [items[3], items[4]], 
          [items[5]],           
          [items[6]],          
        ];
  
 
        groups.forEach((group) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("carousel-slide"); 
          group.forEach((item) => wrapper.appendChild(item));
          grid.appendChild(wrapper);
        });
  
  
        const carouselContainer = document.createElement("div");
        carouselContainer.classList.add("carousel-container");
        grid.parentNode.insertBefore(carouselContainer, grid);
        carouselContainer.appendChild(grid);
  
      
        const prevButton = document.createElement("button");
        prevButton.classList.add("carousel-btn", "prev-btn");
  
        const svgPrev = ` <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="22"
                    transform="rotate(-180 22 22)"
                    fill="#313131"
                  />
                  <path
                    d="M24.5382 30.4615L16.0767 21.9999L24.5382 13.5384"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="square"
                  />
                </svg>`
        prevButton.innerHTML = svgPrev;
  
        const nextButton = document.createElement("button");
        nextButton.classList.add("carousel-btn", "next-btn");
  
        const svgNext = ` <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22" cy="22" r="22" fill="#313131" />
                  <path
                    d="M19.4618 13.5384L27.9233 21.9999L19.4618 30.4615"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="square"
                  />
                </svg>`
        nextButton.innerHTML = svgNext;
  
      
        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("carousel-dots");
  
      
        const dots = [];
        for (let i = 0; i < groups.length; i++) {
          const dot = document.createElement("span");
          dot.classList.add("carousel-dot");
          dots.push(dot);
          dotsContainer.appendChild(dot);
        }
  
        carouselContainer.appendChild(prevButton);
        carouselContainer.appendChild(dotsContainer);
        carouselContainer.appendChild(nextButton);
  
        // Логика прокрутки
        let currentIndex = 0;
  
        const slideWidth = grid.querySelector(".carousel-slide").offsetWidth; 
        const gap = 30; 
        const stepWidth = slideWidth + gap; 
  
        const updateCarousel = () => {
          grid.style.transform = `translateX(-${currentIndex * stepWidth}px)`;
  
       
          if (currentIndex === 0) {
            prevButton.disabled = true;
          } else {
            prevButton.disabled = false;
          }
  
          if (currentIndex >= groups.length - 1) {
            nextButton.disabled = true; 
          } else {
            nextButton.disabled = false;
          }
  
        
          dots.forEach((dot, index) => {
            dot.classList.remove("active");
            if (index === currentIndex) {
              dot.classList.add("active");
            }
          });
        };
  
        prevButton.addEventListener("click", () => {
          if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
          }
        });
  
        nextButton.addEventListener("click", () => {
          if (currentIndex < groups.length - 1) {
            currentIndex++;
            updateCarousel();
          }
        });
  
     
        grid.style.transition = "transform 0.3s ease-in-out";
        grid.style.display = "flex";
        grid.style.flexWrap = "nowrap";
        grid.style.gap = "30px";  
  
        updateCarousel(); 
      }
    };
  
    setupCarousel();
  
 
    window.addEventListener("resize", () => {
        location.reload(); 
      });
    });
  
  