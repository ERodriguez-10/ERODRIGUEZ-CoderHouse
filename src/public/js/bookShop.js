document.addEventListener("DOMContentLoaded", (event) => {
  const button = document.getElementById("menu-button");
  const dropdown = document.getElementById("dropdown-menu");

  button.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  const filterButton = document.getElementById("filter-button-0");
  const filterDropdown = document.getElementById("filter-section-0");
  const openSection0 = document.getElementById("open-section-0");
  const closeSection0 = document.getElementById("close-section-0");

  filterButton.addEventListener("click", () => {
    filterDropdown.classList.toggle("hidden");
    openSection0.classList.toggle("hidden");
    closeSection0.classList.toggle("hidden");
  });

  const filterButton1 = document.getElementById("filter-button-1");
  const filterDropdown1 = document.getElementById("filter-section-1");
  const openSection1 = document.getElementById("open-section-1");
  const closeSection1 = document.getElementById("close-section-1");

  filterButton1.addEventListener("click", () => {
    filterDropdown1.classList.toggle("hidden");
    openSection1.classList.toggle("hidden");
    closeSection1.classList.toggle("hidden");
  });

  const filterButton2 = document.getElementById("filter-button-2");
  const filterDropdown2 = document.getElementById("filter-section-2");
  const openSection2 = document.getElementById("open-section-2");
  const closeSection2 = document.getElementById("close-section-2");

  filterButton2.addEventListener("click", () => {
    filterDropdown2.classList.toggle("hidden");
    openSection2.classList.toggle("hidden");
    closeSection2.classList.toggle("hidden");
  });

  const filterButton3 = document.getElementById("filter-button-3");
  const filterDropdown3 = document.getElementById("filter-section-3");
  const openSection3 = document.getElementById("open-section-3");
  const closeSection3 = document.getElementById("close-section-3");

  filterButton3.addEventListener("click", () => {
    filterDropdown3.classList.toggle("hidden");
    openSection3.classList.toggle("hidden");
    closeSection3.classList.toggle("hidden");
  });

  const filterButton4 = document.getElementById("filter-button-4");
  const filterDropdown4 = document.getElementById("filter-section-4");
  const openSection4 = document.getElementById("open-section-4");
  const closeSection4 = document.getElementById("close-section-4");

  filterButton4.addEventListener("click", () => {
    filterDropdown4.classList.toggle("hidden");
    openSection4.classList.toggle("hidden");
    closeSection4.classList.toggle("hidden");
  });

  const fStatusAvailable = document.getElementById("f-status-available");
  const fStatusUnavailable = document.getElementById("f-status-unavailable");

  const currentUrl = new URL(window.location.href);

  const urlParams = new URLSearchParams(currentUrl.search);

  const status = urlParams.get("status");

  if (status === "available") {
    fStatusAvailable.checked = true;
  } else if (status === "unavailable") {
    fStatusUnavailable.checked = true;
  }
});
