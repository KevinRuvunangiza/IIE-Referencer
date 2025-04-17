const refInfoMsg = "Now referencing a ";

let authorInput = document.getElementById("author-input");
let pageNameInput = document.getElementById("pageName-input");
let yearInput = document.getElementById("year-input");
let monthInput = document.getElementById("month-input");
let dayInput = document.getElementById("day-input");

let urlInput = document.getElementById("url-input");
let yearAccInput = document.getElementById("year-accessed-input");
let monthAccInput = document.getElementById("month-accessed-input");
let dayAccInput = document.getElementById("day-accessed-input");
let cityInput = document.getElementById("city-input");
let publisherInput = document.getElementById("publisher-input");

let referenceListElement = document.getElementById("reference-list");
let referenceTypeInfo = document.getElementById("reference-type-info");
let referenceType = document.getElementById("reference-type");

let refList = [];

function SetReferenceType() {
  const type = referenceType.value;
  referenceTypeInfo.textContent = refInfoMsg + type;

  const accessedInputs = document.querySelector(".accessed-inputs");
  const urlContainer = document.getElementById("url-container");
  const monthDayContainer = document.getElementById("month-day-container");
  const bookContainer = document.getElementById("book-container");

  if (type === "Website") {
    accessedInputs.style.display = "flex";
    urlContainer.style.display = "block";
    monthDayContainer.style.display = "block";
    bookContainer.style.display = "none";
  } else {
    accessedInputs.style.display = "none";
    urlContainer.style.display = "none";
    monthDayContainer.style.display = "none";
    bookContainer.style.display = "block";
  }
}

function GenerateReferenceList() {
  const type = referenceType.value;

  const authorRaw = authorInput.value.trim();
  const pageName = pageNameInput.value.trim();
  const year = yearInput.value.trim();
  const month = monthInput.value.trim();
  const day = dayInput.value.trim();
  const url = urlInput.value.trim();
  const city = cityInput.value.trim();
  const publisher = publisherInput.value.trim();
  const yearAccessed = yearAccInput.value.trim();
  const monthAccessed = monthAccInput.value.trim();
  const dayAccessed = dayAccInput.value.trim();

  // Handle multiple authors with "and" for two or more
  const authorsFormatted = (() => {
    const authorArray = authorRaw.split(";").map(author => {
      const nameParts = author.trim().split(" ");
      const lastName = nameParts.pop();
      const initials = nameParts.map(n => n.charAt(0).toUpperCase()).join(" ");
      return `${lastName}, ${initials}`;
    });

    if (authorArray.length === 1) {
      return authorArray[0];
    } else if (authorArray.length === 2) {
      return `${authorArray[0]} and ${authorArray[1]}`;
    } else {
      return authorArray.slice(0, -1).join(", ") + ", and " + authorArray[authorArray.length - 1];
    }
  })();

  let reference = "";
  let icon = "";

  if (type === "Website") {
    icon = "🌐";
    reference = `${authorsFormatted}. ${year}. ${pageName}, ${day} ${month} ${year}.\n[Online]. Available at:\n${url}\n[Accessed ${dayAccessed} ${monthAccessed} ${yearAccessed}].`;
  } else if (type === "Book") {
    icon = "📘";
    reference = `${authorsFormatted}. ${year}. <em>${pageName}</em>.\n${city}: ${publisher}`;
  }

  const genRefTxt = document.createElement("h3");
  genRefTxt.innerHTML = `${icon} ${reference}`;

  const referenceContainer = document.createElement("div");
  referenceContainer.id = "reference";
  referenceContainer.appendChild(genRefTxt);

  referenceListElement.appendChild(referenceContainer);

  refList.push({
    author: authorRaw,
    pageName,
    year,
    month,
    day,
    url,
    yearAccessed,
    monthAccessed,
    dayAccessed,
    type
  });

  // Clear inputs
  authorInput.value = "";
  pageNameInput.value = "";
  yearInput.value = "";
  monthInput.value = "";
  dayInput.value = "";
  urlInput.value = "";
  yearAccInput.value = "";
  monthAccInput.value = "";
  dayAccInput.value = "";
  cityInput.value = "";
  publisherInput.value = "";

  console.log(refList);
}

// Initialize correct fields visibility on page load
document.addEventListener("DOMContentLoaded", () => {
  SetReferenceType();
});
