document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // 1) تحميل الدول من API
  // ============================
  fetch("http://127.0.0.1:8000/api/countries/")
    .then(res => res.json())
    .then(countries => {
      const select = document.getElementById("filter-country");

      countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id; // نرسل ID للفلترة
        option.textContent = `${c.flag} ${c.name_ar}`;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading countries:", err));


  // ============================
  // 2) تحميل أنواع الفرص من API
  // ============================
  fetch("http://127.0.0.1:8000/api/opportunity-types/")
    .then(res => res.json())
    .then(types => {
      const select = document.getElementById("filter-type");

      types.forEach(t => {
        const option = document.createElement("option");
        option.value = t.id; // نرسل ID للفلترة
        option.textContent = t.label_ar;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading types:", err));


  // ============================
  // 3) تحميل أنواع التمويل
  // ============================
  fetch("http://127.0.0.1:8000/api/funding-types/")
    .then(res => res.json())
    .then(fundings => {
      const select = document.getElementById("filter-funding");

      fundings.forEach(f => {
        const option = document.createElement("option");
        option.value = f.id;
        option.textContent = f.label_ar;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading funding types:", err));


  // ============================
  // 4) تشغيل البحث
  // ============================
  function performSearch() {
    const search = document.getElementById("search-input").value.trim();
    const country = document.getElementById("filter-country").value;
    const type = document.getElementById("filter-type").value;
    const funding = document.getElementById("filter-funding").value;

    let url = "opportunities.html?";

    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (country) url += `country=${country}&`;
    if (type) url += `type=${type}&`;
    if (funding) url += `funding=${funding}&`;

    url = url.replace(/&$/, "");

    window.location.href = url;
  }

  // زر البحث
  document.querySelector(".search-btn").addEventListener("click", performSearch);

  // الضغط على Enter
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
  });

});
