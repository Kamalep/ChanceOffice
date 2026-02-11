document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // تحميل الدول
  // ============================
  fetch("http://127.0.0.1:8000/api/countries/")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("country");
      console.log("📌 Countries API Response:", data);

      data.forEach(c => {
        const option = document.createElement("option");
        option.value = Number(c.id);
        option.textContent = `${c.flag} ${c.name_ar}`;
        select.appendChild(option);
      });

      console.log("📌 Countries Select InnerHTML:", select.innerHTML);
    });

  // ============================
  // تحميل أنواع الفرص
  // ============================
  fetch("http://127.0.0.1:8000/api/opportunity-types/")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("type");
      console.log("📌 Types API Response:", data);

      data.forEach(t => {
        const option = document.createElement("option");
        option.value = Number(t.id);
        option.textContent = t.label_ar;
        select.appendChild(option);
      });

      console.log("📌 Types Select InnerHTML:", select.innerHTML);
    });

  // ============================
  // تحميل أنواع التمويل
  // ============================
  fetch("http://127.0.0.1:8000/api/funding-types/")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("funding_type");
      console.log("📌 Funding API Response:", data);

      data.forEach(f => {
        const option = document.createElement("option");
        option.value = Number(f.id);
        option.textContent = f.label_ar;
        select.appendChild(option);
      });

      console.log("📌 Funding Select InnerHTML:", select.innerHTML);
    });

  // ============================
  // إرسال نموذج إضافة الفرصة
  // ============================
  document.getElementById("add-opportunity-form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("22 Selected values:", {
       country: document.getElementById("country").value,
       type: document.getElementById("type").value,
       funding_type: document.getElementById("funding_type").value
    });

    const payload = {
      title: document.getElementById("title").value,
      country_id: Number(document.getElementById("country").value), 
      type_id: Number(document.getElementById("type").value), 
      funding_type_id: Number(document.getElementById("funding_type").value),
      deadline: document.getElementById("deadline").value || null,
      provider: document.getElementById("provider").value,
      apply_link: document.getElementById("apply_link").value,
      source: document.getElementById("source").value,
      description: document.getElementById("description").value,
      is_active: document.getElementById("is_active").checked,
      verified: document.getElementById("verified").checked
    };

    console.log("🚀 Payload to send:", payload);

    fetch("http://127.0.0.1:8000/api/opportunities/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async res => {
        const responseData = await res.json();
        console.log("📥 API Response:", responseData);

        if (!res.ok) {
          throw new Error("❌ خطأ في الإضافة");
        }

        document.getElementById("result-message").textContent = "✔ تمت إضافة الفرصة بنجاح";
        document.getElementById("result-message").style.color = "green";

        document.getElementById("add-opportunity-form").reset();
      })
      .catch(err => {
        console.error("🔥 Error:", err);
        document.getElementById("result-message").textContent = "✖ حدث خطأ أثناء الإضافة";
        document.getElementById("result-message").style.color = "red";
      });

  });

});
