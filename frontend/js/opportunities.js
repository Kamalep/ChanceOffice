const API_URL = "http://127.0.0.1:8000/api/opportunities/";
let currentPage = 1;

/* ===========================
   قراءة الـ Query Parameters
=========================== */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    search: params.get("search") || "",
    country: params.get("country") || "",
    type: params.get("type") || ""
  };
}

/* ===========================
   تحميل الفرص من الـ API
=========================== */
function loadOpportunities(page = 1) {
  const params = getQueryParams();

  const search = document.getElementById("search-input")?.value || params.search;
  const country = document.getElementById("filter-country")?.value || params.country;
  const type = document.getElementById("filter-type")?.value || params.type;

  let url = `${API_URL}?page=${page}`;

  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (country) url += `&country=${encodeURIComponent(country)}`;
  if (type) url += `&type=${encodeURIComponent(type)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      currentPage = page;
      renderOpportunities(data.results);
      renderPagination(data.next, data.previous);
      handleNoResults(data.results);
    })
    .catch(err => console.error("Error loading opportunities:", err));
}

/* ===========================
   عرض الكروت
=========================== */
function renderOpportunities(list) {
  const container = document.getElementById("opportunities-list");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "opportunity-card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Provider:</strong> ${item.provider}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Country:</strong> ${item.country}</p>
      <p><strong>Deadline:</strong> ${item.deadline}</p>
      <a href="${item.link}" target="_blank" class="apply-btn">View Details</a>
    `;

    container.appendChild(card);
  });
}

/* ===========================
   رسالة "لا توجد نتائج"
=========================== */
function handleNoResults(list) {
  let msg = document.getElementById("no-results");

  if (!msg) {
    msg = document.createElement("p");
    msg.id = "no-results";
    msg.style.textAlign = "center";
    msg.style.marginTop = "20px";
    msg.style.color = "#777";
    msg.style.display = "none";
    msg.textContent = "No opportunities found.";
    document.querySelector(".opportunities-container").after(msg);
  }

  msg.style.display = list.length === 0 ? "block" : "none";
}

/* ===========================
   Pagination
=========================== */
function renderPagination(next, previous) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (previous) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.onclick = () => loadOpportunities(currentPage - 1);
    pagination.appendChild(prevBtn);
  }

  const pageLabel = document.createElement("span");
  pageLabel.textContent = `Page ${currentPage}`;
  pagination.appendChild(pageLabel);

  if (next) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => loadOpportunities(currentPage + 1);
    pagination.appendChild(nextBtn);
  }
}

/* ===========================
   تعبئة الدول والأنواع
=========================== */
function loadFilters() {
  const params = getQueryParams();

  // الدول
  fetch("http://127.0.0.1:8000/api/opportunity-countries/")
    .then(res => res.json())
    .then(countries => {
      const select = document.getElementById("filter-country");
      countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
      });

      select.value = params.country;
    });

  // الأنواع
  fetch("http://127.0.0.1:8000/api/opportunity-types/")
    .then(res => res.json())
    .then(types => {
      const select = document.getElementById("filter-type");
      types.forEach(t => {
        const option = document.createElement("option");
        option.value = t.value;
        option.textContent = t.label;
        select.appendChild(option);
      });

      select.value = params.type;
    });

  // البحث
  document.getElementById("search-input").value = params.search;
}

/* ===========================
   زر الفلترة
=========================== */
document.getElementById("filter-btn").addEventListener("click", () => {
  loadOpportunities(1);
});

/* ===========================
   تشغيل الصفحة
=========================== */
loadFilters();
loadOpportunities();
