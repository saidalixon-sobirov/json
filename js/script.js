"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // LOADER

  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    }, 1500);
  }, 2000);

  // TABS

  const tabContent = document.querySelectorAll(".tabcontent"),
    tabs = document.querySelectorAll(".tabheader__item"),
    headerTabs = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((btn) => {
      btn.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  headerTabs.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // MODAL

  const modal = document.querySelector(".modal"),
    closeModal = document.querySelector(".modal__close"),
    allModal = document.querySelectorAll("[data-modal]");

  function showModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function hideModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  allModal.forEach((items) => {
    items.addEventListener("click", showModal);
  });

  closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });

  const modalTimer = setTimeout(showModal, 500000);

  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }

  window.addEventListener("scroll", showMyModalByScroll);

  // DATA

  const deadline = "2022-03-21";

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()), //millisekund
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      seconds = Math.floor((total / 1000) % 60);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }

    function updateClock() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // CLASS CARDS

  class CarCard {
    constructor(src, alt, title, desc, price, parentSelector, ...classess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.classess = classess;
      this.parent = document.querySelector(parentSelector);
      this.tranfer = 11;
      this.changeToSUM();
    }

    changeToSUM() {
      this.price = this.price * this.tranfer;
    }

    render() {
      const element = document.createElement("div");

      element.classList.add("menu__item");

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.desc}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> $</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  new CarCard(
    "img/tabs/1.jpg",
    "BMW",
    "2021 Mercedes-Benz C-Class",
    `The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    100,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/2.jpg",
    "BMW",
    "2021 Mercedes-Benz C-Class",
    `The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    100,
    ".menu .container"
  ).render();

  new CarCard(
    "img/tabs/3.jpg",
    "BMW",
    "2021 Mercedes-Benz C-Class",
    `The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    100,
    ".menu .container"
  ).render();

  // SLIDER first way  (eng oson yuli)

  // const slides = document.querySelectorAll(".offer__slide"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next");

  // let slideIndex = 1;

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // }

  // show(slideIndex);

  // function show(s) {
  //   if (s > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (s < 1) {
  //     slideIndex = slides.length;
  //     ``;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIndex - 1].style.display = "block";

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   }
  // }

  // function slidePlus(s) {
  //   show((slideIndex += 1));
  // }

  // function slideMinus(s) {
  //   show((slideIndex -= 1));
  // }

  // prev.addEventListener("click", () => {
  //   slideMinus(1);
  // });

  // next.addEventListener("click", () => {
  //   slidePlus(1);
  // });

  // // second way

  // const slides = document.querySelectorAll(".offer__slide"),
  //   slideWrapper = document.querySelector(".offer__slider-wrapper"),
  //   width = window.getComputedStyle(slideWrapper).width,
  //   slidesField = document.querySelector(".offer__slider-inner"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next");

  // let slideIndex = 1,
  //   offer = 0;

  // if (slides.length < 10) {
  //   current.textContent = `0${slideIndex}`;
  //   total.textContent = `0${slides.length}`;
  // }

  // slidesField.style.width = 100 * slides.length + "%";
  // slidesField.style.display = "flex";
  // slidesField.style.transition = "0.5s all";
  // slideWrapper.style.overflow = "hidden";

  // slides.forEach((item) => (item.style.width = width));

  // next.addEventListener("click", () => {
  //   if (offer == +width.slice(0, width.length - 2) * (slides.length - 1)) {
  //     offer = 0;
  //   } else {
  //     offer += +width.slice(0, width.length - 2);
  //   }

  //   slidesField.style.transform = `translateX(-${offer}px)`;

  //   if (slideIndex == slides.length) {
  //     slideIndex = 1;
  //   } else {
  //     slideIndex++;
  //   }

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   }
  // });

  // prev.addEventListener("click", () => {
  //   if (offer == 0) {
  //     offer = +width.slice(0, width.length - 2) * (slides.length - 1); //1950 - 650
  //   } else {
  //     offer -= +width.slice(0, width.length - 2); //650
  //   }

  //   slidesField.style.transform = `translateX(-${offer}px)`;

  //   if (slideIndex == 1) {
  //     slideIndex = slides.length;
  //   } else {
  //     slideIndex--;
  //   }

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   }
  // });

  // 3rd way

  const slides = document.querySelectorAll(".offer__slide"),
    slideWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slideWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    //
    slider = document.querySelector(".offer__slider");
  //
  let slideIndex = 1,
    offer = 0;

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
    total.textContent = `0${slides.length}`;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slideWrapper.style.overflow = "hidden";

  slides.forEach((item) => (item.style.width = width));

  // add dots

  slider.style.position = "relative";

  let ol = document.createElement("ol"),
    dots = [];

  ol.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 10px;
    left: 0;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    z-index: 20;
    `;

  slider.append(ol);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      width: 30px;
      height: 5px;
      background-color: #fff;
      margin: 0 5px;
      cursor: pointer;
      opacity: 0.5;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    ol.append(dot);
    dots.push(dot);
  }

  //

  next.addEventListener("click", () => {
    if (offer == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offer = 0;
    } else {
      offer += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offer}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    }

    //
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
    //
  });

  prev.addEventListener("click", () => {
    if (offer == 0) {
      offer = +width.slice(0, width.length - 2) * (slides.length - 1); //1950 - 650
    } else {
      offer -= +width.slice(0, width.length - 2); //650
    }

    slidesField.style.transform = `translateX(-${offer}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    }
    //
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
    //
  });

  //
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;

      offer = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offer}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      }

      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      dots[slideIndex - 1].style.opacity = "1";
    });
  });

  //

  // ACCORDION

  const accordion = document.querySelectorAll(".accordion");

  accordion.forEach((acc) => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");

      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // bazaga malumot yuborish

  const forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    postData(item);
  });

  const message = {
    loading: "Yuklanmoqda...",
    success: "Murojaatingiz qabul qilindi :)",
    error: "Xatolik yuz berdi :(",
  };

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.style.cssText = `
          font-size: 20px;
          text-align: center;
          padding-top: 20px;
      `;
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // request.setRequestHeader("Content-type", "application/json");

      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      // const json = JSON.stringify(object);

      // request.send(json);

      // fetch

      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // body: formData,
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 4000);
        })
        .catch(() => {
          statusMessage.textContent = message.error;
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     statusMessage.textContent = message.success;
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 4000);
      //   } else {
      //     statusMessage.textContent = message.error;
      //   }
      // });
    });
  }
  /*
  // fetch  API

  // fetch("https://jsonplaceholder.typicode.com/todos/1")
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // fetch("https://jsonplaceholder.typicode.com/todos")
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ name: "JS" }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
    
  */
});
