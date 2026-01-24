from django.contrib import admin
from django.urls import path
from siteinfo.views import home

from opportunities.views import (
    OpportunityListCreateView,
    OpportunityRetrieveUpdateDeleteView,
    CountriesView,
    OpportunityTypesView,
    FundingTypesView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/home/', home),

    # الفرص
    path('api/opportunities/', OpportunityListCreateView.as_view()),
    # path('api/opportunities/<uuid:pk>/', OpportunityRetrieveUpdateDeleteView.as_view()),
    path("api/opportunities/<uuid:uid>/", OpportunityRetrieveUpdateDeleteView.as_view()),


    # الدول
    path('api/countries/', CountriesView.as_view()),

    # أنواع الفرص
    path('api/opportunity-types/', OpportunityTypesView.as_view()),

    # أنواع التمويل
    path('api/funding-types/', FundingTypesView.as_view()),
]
