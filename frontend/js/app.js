let allOpportunities = [];
///  متغير لتحكم في حجم الصفحات
let currentPage = 1;
let nextPageUrl = null;
let prevPageUrl = null;


// Load Header
fetch("components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

// Load Footer
fetch("components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


// دالة تحميل الهيدر و الفوتر واي كمبونت
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error("Error loading component:", error));
}

// أعادة استخدام الدالة
loadComponent("components/header.html", "header");
loadComponent("components/footer.html", "footer");



// Render opportunities
function renderOpportunities(list) {
    const container = document.getElementById("opportunitiesList");
    container.innerHTML = "";

    list.forEach(item => {
        const card = `
            <div class="opportunity-card">
                <h3>${item.title}</h3>

                <p><strong>Provider:</strong> ${item.provider || "N/A"}</p>
                <p><strong>Country:</strong> ${item.country || "N/A"}</p>
                <p><strong>Type:</strong> ${item.type || "N/A"}</p>

                <p><strong>Deadline:</strong> 
                    ${item.deadline ? new Date(item.deadline).toLocaleDateString() : "No deadline"}
                </p>

                <p>${item.description || ""}</p>

                <p><strong>Source:</strong> ${item.source || "Unknown"}</p>

                <a href="${item.link}" target="_blank" class="apply-btn">Open Link</a>

                ${item.verified ? `<span class="verified-badge">Verified</span>` : ""}
            </div>
        `;
        container.innerHTML += card;
    });
}

function loadOpportunitiesFromAPI(url = "http://127.0.0.1:8000/api/opportunities/") {
    fetch(url)
       .then(response => response.json())
       .then(data => {
           console.log("DATA FROM API:", data);

            // حفظ روابط الصفحات
            nextPageUrl = data.next;
            prevPageUrl = data.previous;

            // حفظ رقم الصفحة الحالية
            currentPage = getPageNumberFromUrl(url);

            // عرض الفرص
            allOpportunities = data.results;
            renderOpportunities(allOpportunities);

            updatePaginationUI();
    })
}

function getPageNumberFromUrl(url) {
    const params = new URL(url).searchParams;
    return parseInt(params.get("page")) || 1;
}


function updatePaginationUI() {
    document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

    document.getElementById("prevBtn").disabled = !prevPageUrl;
    document.getElementById("nextBtn").disabled = !nextPageUrl;
}

// Load from API instead of dummy data
loadOpportunitiesFromAPI();

// استدعاء الدول عند تحميل الصفحة
function loadCountries() {
    fetch("http://127.0.0.1:8000/api/opportunity-countries/")
        .then(response => response.json())
        .then(countries => {
            const select = document.getElementById("countryFilter");

            // إضافة خيار "الكل"
            select.innerHTML = `<option value="">All Countries</option>`;

            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country;
                option.textContent = country;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading countries:", error);
        });
}

loadCountries();

function loadTypes() {
    fetch("http://127.0.0.1:8000/api/opportunity-types/")
        .then(response => response.json())
        .then(types => {
            const select = document.getElementById("typeFilter");

            // خيار "الكل"
            select.innerHTML = `<option value="">All Types</option>`;

            types.forEach(item => {
                const option = document.createElement("option");
                option.value = item.value;   // مثل: "scholarship"
                option.textContent = item.label; // مثل: "Scholarship"
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading types:", error);
        });
}

loadTypes();



function applyFilters() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const countryValue = document.getElementById("countryFilter").value;
    const typeValue = document.getElementById("typeFilter").value;

    const filtered = allOpportunities.filter(item => {
        const matchesSearch =
            (item.title && item.title.toLowerCase().includes(searchValue)) ||
            (item.description && item.description.toLowerCase().includes(searchValue)) ||
            (item.provider && item.provider.toLowerCase().includes(searchValue));

        const matchesCountry =
            countryValue === "" || item.country === countryValue;

        const matchesType =
            typeValue === "" || item.type === typeValue;

        return matchesSearch && matchesCountry && matchesType;
    });

    renderOpportunities(filtered);
}


///-------- updatePaginationUI place

document.getElementById("prevBtn").addEventListener("click", () => {
    if (prevPageUrl) loadOpportunitiesFromAPI(prevPageUrl);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (nextPageUrl) loadOpportunitiesFromAPI(nextPageUrl);
});




document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("countryFilter").addEventListener("change", applyFilters);
document.getElementById("typeFilter").addEventListener("change", applyFilters);
