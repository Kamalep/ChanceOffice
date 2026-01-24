document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".cards-container");

    // تفريغ البطاقات القديمة المكتوبة يدويًا
    container.innerHTML = "";

    // جلب الأنواع من API
    fetch("http://127.0.0.1:8000/api/opportunity-types/")
        .then(res => res.json())
        .then(types => {

            if (!types.length) {
                container.innerHTML = "<p>لا توجد أنواع فرص متاحة حاليًا.</p>";
                return;
            }

            types.forEach(type => {

                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                    <h2>${type.label_ar}</h2>
                    <p>${type.description || "لا يوجد وصف متاح لهذا النوع."}</p>
                    <a class="card-btn" href="opportunities.html?type=${type.id}">
                        عرض الفرص
                    </a>
                `;

                container.appendChild(card);
            });

        })
        .catch(err => {
            console.error("Error loading types:", err);
            container.innerHTML = "<p>حدث خطأ أثناء تحميل أنواع الفرص.</p>";
        });

});
