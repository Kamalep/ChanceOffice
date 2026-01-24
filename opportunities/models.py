from django.db import models
import uuid


# ============================
# جدول الدول
# ============================
class Country(models.Model):
    name_en = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    code = models.CharField(max_length=10, blank=True, null=True)
    flag = models.CharField(max_length=10, blank=True, null=True)  # مثال: 🇸🇦

    def __str__(self):
        return self.name_ar


# ============================
# جدول أنواع الفرص
# ============================
class OpportunityType(models.Model):
    value = models.CharField(max_length=100, unique=True)  # مثل: scholarships
    label_en = models.CharField(max_length=100)
    label_ar = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.label_ar


# ============================
# جدول أنواع التمويل
# ============================
class FundingType(models.Model):
    value = models.CharField(max_length=100, unique=True)  # مثل: fully_funded
    label_en = models.CharField(max_length=100)
    label_ar = models.CharField(max_length=100)

    def __str__(self):
        return self.label_ar


# ============================
# جدول الفرص
# ============================
class Opportunity(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=255)
    description = models.TextField()

    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    type = models.ForeignKey(OpportunityType, on_delete=models.SET_NULL, null=True)
    funding_type = models.ForeignKey(FundingType, on_delete=models.SET_NULL, null=True)

    deadline = models.DateField(null=True, blank=True)
    apply_link = models.URLField(null=True, blank=True)

    # الحقول الإضافية
    provider = models.CharField(max_length=255, blank=True, null=True)  # ← تمت إضافته هنا
    source = models.CharField(max_length=50)  # Official, Partner, Community
    is_active = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

