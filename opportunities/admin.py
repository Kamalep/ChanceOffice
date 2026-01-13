from django.contrib import admin
from .models import Opportunity

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'provider', 'type', 'country', 'deadline', 'verified', 'is_active')
    list_filter = ('type', 'country', 'verified', 'is_active')
    search_fields = ('title', 'provider')
