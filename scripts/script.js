const refInfoMsg = "Now referencing ";

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

  const needsAccessAndURL = ["Website", "PDF", "YouTube"].includes(type);

  accessedInputs.style.display = needsAccessAndURL ? "flex" : "none";
  urlContainer.style.display = needsAccessAndURL ? "block" : "none";
  monthDayContainer.style.display = "none"; // Always hide publication month/day
  bookContainer.style.display = (type === "Book" || type === "PDF") ? "block" : "none";
}

function GenerateReferenceList() {
  const type = referenceType.value;

  const authorRaw = authorInput.value.trim();
  const pageName = pageNameInput.value.trim();
  const year = yearInput.value.trim();
  const url = urlInput.value.trim();
  const city = cityInput.value.trim();
  const publisher = publisherInput.value.trim();
  const yearAccessed = yearAccInput.value.trim();
  const monthAccessed = monthAccInput.value.trim();
  const dayAccessed = dayAccInput.value.trim();

  const authorsFormatted = (() => {
    const authorArray = authorRaw.split(";").map(author => {
      const nameParts = author.trim().split(" ");
      const lastName = nameParts.pop();
      const initials = nameParts.map(n => n.charAt(0).toUpperCase() + ".").join(" ");
      return `${lastName}, ${initials}`;
    });

    if (authorArray.length === 1) return authorArray[0];
    if (authorArray.length === 2) return `${authorArray[0]} and ${authorArray[1]}`;
    return authorArray.slice(0, -1).join(", ") + ", and " + authorArray[authorArray.length - 1];
  })();

  let reference = "";
  let icon = "";

  if (type === "Website") {
    icon = "🌐";
    reference = `${authorsFormatted}, ${year}. <em>${pageName}</em>. [online] Available at: &lt;${url}&gt; [Accessed ${dayAccessed} ${monthAccessed} ${yearAccessed}].`;
  }
  else if (type === "Book") {
    icon = "📘";
    reference = `${authorsFormatted}, ${year}. <em>${pageName}</em>. ${city}: ${publisher}.`;
  }
  else if (type === "PDF") {
    icon = "📄";
    reference = `${authorsFormatted}, ${year}. <em>${pageName}</em> [pdf] ${city}: ${publisher}. Available at: &lt;${url}&gt; [Accessed ${dayAccessed} ${monthAccessed} ${yearAccessed}].`;
  }
  else if (type === "YouTube") {
    icon = "📺";
    reference = `${authorsFormatted}, ${year}. <em>${pageName}</em> [video online] Available at: &lt;${url}&gt; [Accessed ${dayAccessed} ${monthAccessed} ${yearAccessed}].`;
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
    url,
    city,
    publisher,
    yearAccessed,
    monthAccessed,
    dayAccessed,
    type
  });

  // Clear inputs
  [
    authorInput, pageNameInput, yearInput,
    urlInput, yearAccInput, monthAccInput, dayAccInput,
    cityInput, publisherInput
  ].forEach(input => input.value = "");

  console.log(refList);
}

document.addEventListener("DOMContentLoaded", SetReferenceType);
