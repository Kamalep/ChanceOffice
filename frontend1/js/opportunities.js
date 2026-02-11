document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // 1) قراءة الفلاتر من الرابط
  // ============================
  const params = new URLSearchParams(window.location.search);

  const search = params.get("search") || "";
  const country = params.get("country") || "";
  const type = params.get("type") || "";
  const funding = params.get("funding") || "";
  const ordering = params.get("ordering") || "-created_at"; // ⭐ جديد
  const page = params.get("page") || 1;

  // تعبئة الفلاتر في الصفحة
  document.getElementById("search-input").value = search;
  document.getElementById("filter-country").value = country;
  document.getElementById("filter-type").value = type;
  document.getElementById("filter-funding").value = funding;
  document.getElementById("sort-select").value = ordering; // ⭐ جديد

  // ============================
  // 2) تحميل الدول
  // ============================
  fetch("http://127.0.0.1:8000/api/countries/")
    .then(res => res.json())
    .then(countries => {
      const select = document.getElementById("filter-country");

      countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = `${c.flag} ${c.name_ar}`;
        select.appendChild(option);
      });

      select.value = country;
    });

  // ============================
  // 3) تحميل الأنواع
  // ============================
  fetch("http://127.0.0.1:8000/api/opportunity-types/")
    .then(res => res.json())
    .then(types => {
      const select = document.getElementById("filter-type");

      types.forEach(t => {
        const option = document.createElement("option");
        option.value = t.id;
        option.textContent = t.label_ar;
        select.appendChild(option);
      });

      select.value = type;
    });

  // ============================
  // 4) تحميل أنواع التمويل
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

      select.value = funding;
    });

  // ============================
  // 5) تحميل الفرص من API
  // ============================
  function loadOpportunities() {
    let url = `http://127.0.0.1:8000/api/opportunities/?page=${page}`;

    if (search) url += `&search=${search}`;
    if (country) url += `&country=${country}`;
    if (type) url += `&type=${type}`;
    if (funding) url += `&funding_type=${funding}`;
    if (ordering) url += `&ordering=${ordering}`; // ⭐ جديد

    fetch(url)
      .then(res => res.json())
      .then(data => {
        renderOpportunities(data.results);
        renderPagination(data.count);
      })
      .catch(err => console.error("Error loading opportunities:", err));
  }

  loadOpportunities();

  // ============================
  // 6) عرض الكروت
  // ============================
  function renderOpportunities(list) {
    const container = document.getElementById("opportunities-container");
    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = "<p>لا توجد نتائج مطابقة للبحث</p>";
      return;
    }

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "opportunity-card";

      card.innerHTML = `
        <h3>${item.title}</h3>

        <div class="opportunity-meta">
          <span>الدولة: ${item.country.flag} ${item.country.name_ar}</span><br>
          <span>النوع: ${item.type.label_ar}</span><br>
          <span>الموعد النهائي: ${item.deadline || "غير محدد"}</span>
        </div>

        <span class="badge">${item.funding_type.label_ar}</span>

        <a href="opportunity.html?uid=${item.uid}" class="view-btn">عرض التفاصيل</a>
      `;

      container.appendChild(card);
    });
  }

  // ============================
  // 7) الباجينايشن
  // ============================
  function renderPagination(total) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    const totalPages = Math.ceil(total / 10);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;

      if (i == page) btn.classList.add("active");

      btn.addEventListener("click", () => {
        params.set("page", i);
        window.location.search = params.toString();
      });

      container.appendChild(btn);
    }
  }

  // ============================
  // 8) زر البحث
  // ============================
  document.getElementById("search-btn").addEventListener("click", () => {
    applyFilters();
  });

  function applyFilters() {
    const newParams = new URLSearchParams();

    const s = document.getElementById("search-input").value.trim();
    const c = document.getElementById("filter-country").value;
    const t = document.getElementById("filter-type").value;
    const f = document.getElementById("filter-funding").value;
    const o = document.getElementById("sort-select").value; // ⭐ جديد

    if (s) newParams.set("search", s);
    if (c) newParams.set("country", c);
    if (t) newParams.set("type", t);
    if (f) newParams.set("funding", f);

    newParams.set("ordering", o); // ⭐ جديد
    newParams.set("page", 1);

    window.location.search = newParams.toString();
  }

  // ============================
  // 9) تغيير الترتيب
  // ============================
  document.getElementById("sort-select").addEventListener("change", () => {
    params.set("ordering", document.getElementById("sort-select").value);
    params.set("page", 1);
    window.location.search = params.toString();
  });

});
