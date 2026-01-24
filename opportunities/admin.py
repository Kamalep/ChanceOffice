from django.contrib import admin
from .models import Country, OpportunityType, FundingType, Opportunity


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name_ar", "name_en", "code", "flag")
    search_fields = ("name_ar", "name_en", "code")


@admin.register(OpportunityType)
class OpportunityTypeAdmin(admin.ModelAdmin):
    list_display = ("label_ar", "label_en", "value")
    search_fields = ("label_ar", "label_en", "value")


@admin.register(FundingType)
class FundingTypeAdmin(admin.ModelAdmin):
    list_display = ("label_ar", "label_en", "value")
    search_fields = ("label_ar", "label_en", "value")


@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "provider",
        "country",
        "type",
        "funding_type",
        "deadline",
        "verified",
        "is_active",
        "created_at",
    )
    list_filter = ("country", "type", "funding_type", "verified", "is_active", "source")
    search_fields = ("title", "provider", "description")
    ordering = ("-created_at",)
