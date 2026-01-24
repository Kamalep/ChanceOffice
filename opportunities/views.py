from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Opportunity, OpportunityType, FundingType, Country
from .serializers import OpportunitySerializer


# ----------------------------------------------------
# 1) قائمة الفرص + إنشاء فرصة
# ----------------------------------------------------
class OpportunityListCreateView(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all().order_by('-deadline')
    serializer_class = OpportunitySerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # الفلاتر
    filterset_fields = ['type', 'country', 'verified', 'is_active', 'funding_type']

    # البحث
    search_fields = ['title', 'provider', 'description']

    # الترتيب
    ordering_fields = ['deadline', 'created_at']



# ----------------------------------------------------
# 2) عرض/تعديل/حذف فرصة واحدة
# ----------------------------------------------------
# class OpportunityRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Opportunity.objects.all()
#     serializer_class = OpportunitySerializer

class OpportunityRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Opportunity.objects.all() 
    serializer_class = OpportunitySerializer 
    lookup_field = "uid"



# ----------------------------------------------------
# 3) API: أنواع الفرص
# ----------------------------------------------------
class OpportunityTypesView(APIView):
    def get(self, request):
        types = OpportunityType.objects.all().values(
            "id", "value", "label_en", "label_ar", "description"
        )
        return Response(types)



# ----------------------------------------------------
# 4) API: أنواع التمويل
# ----------------------------------------------------
class FundingTypesView(APIView):
    def get(self, request):
        funding = FundingType.objects.all().values(
            "id", "value", "label_en", "label_ar"
        )
        return Response(funding)



# ----------------------------------------------------
# 5) API: الدول
# ----------------------------------------------------
class CountriesView(APIView):
    def get(self, request):
        countries = Country.objects.all().values(
            "id", "name_en", "name_ar", "code", "flag"
        )
        return Response(countries)
