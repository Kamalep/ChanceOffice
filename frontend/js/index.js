document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     تعبئة الدول
  =========================== */
  fetch("http://127.0.0.1:8000/api/opportunity-countries/")
    .then(res => res.json())
    .then(countries => {
      const select = document.querySelector(".search-select.countries");
      if (!select) return;

      // امسح كل الخيارات ما عدا أول خيار
      select.innerHTML = '<option value="">All Countries</option>';

      countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading countries:", err));

  /* ===========================
     تعبئة الأنواع
  =========================== */
  fetch("http://127.0.0.1:8000/api/opportunity-types/")
    .then(res => res.json())
    .then(types => {
      const select = document.querySelector(".search-select.types");
      if (!select) return;

      // امسح كل الخيارات ما عدا أول خيار
      select.innerHTML = '<option value="">All Types</option>';

      types.forEach(t => {
        const option = document.createElement("option");
        option.value = t.value;
        option.textContent = t.label;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading types:", err));

  /* ===========================
     زر البحث
  =========================== */
  const searchBtn = document.querySelector(".search-btn");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", () => {
    const search = document.querySelector(".search-input")?.value || "";
    const country = document.querySelector(".search-select.countries")?.value || "";
    const type = document.querySelector(".search-select.types")?.value || "";

    let url = "opportunities.html?";

    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (country) url += `country=${encodeURIComponent(country)}&`;
    if (type) url += `type=${encodeURIComponent(type)}&`;

    // إزالة & الزائدة في النهاية
    url = url.replace(/&$/, "");

    window.location.href = url;
  });
});
