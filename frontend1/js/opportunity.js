document.addEventListener("DOMContentLoaded", () => {

  // 1) قراءة UID من الرابط
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");

  if (!uid) {
    document.querySelector(".opportunity-details").innerHTML =
      "<p>لم يتم العثور على الفرصة</p>";
    return;
  }

  // 2) جلب بيانات الفرصة من API
  fetch(`http://127.0.0.1:8000/api/opportunities/${uid}/`)
    .then(res => res.json())
    .then(data => {
      renderOpportunity(data);
    })
    .catch(err => {
      console.error(err);
      document.querySelector(".opportunity-details").innerHTML =
        "<p>حدث خطأ أثناء تحميل البيانات</p>";
    });

  // 3) عرض بيانات الفرصة داخل الصفحة
  function renderOpportunity(item) {

    // العنوان
    document.getElementById("opp-title").textContent = item.title;

    // معلومات مختصرة
    document.getElementById("opp-meta").innerHTML = `
      <p><strong>الدولة:</strong> ${item.country.flag} ${item.country.name_ar}</p>
      <p><strong>النوع:</strong> ${item.type.label_ar}</p>
      <p><strong>التمويل:</strong> ${item.funding_type.label_ar}</p>
      <p><strong>الموعد النهائي:</strong> ${item.deadline || "غير محدد"}</p>
      <p><strong>المزوّد:</strong> ${item.provider || "غير محدد"}</p>
      <p><strong>المصدر:</strong> ${item.source || "غير محدد"}</p>
    `;

    // الوصف
    document.getElementById("opp-description").innerHTML =
      item.description || "لا يوجد وصف متاح";

    // زر التقديم
    const applyBtn = document.getElementById("opp-apply-btn");
    applyBtn.href = item.apply_link || "#";
    applyBtn.textContent = "التقديم الآن";
  }

});
