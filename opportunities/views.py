from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Opportunity, OPPORTUNITY_TYPES
from .serializers import OpportunitySerializer


class OpportunityListCreateView(generics.ListCreateAPIView):
    queryset = Opportunity.objects.all().order_by('-created_at')
    serializer_class = OpportunitySerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # الفلاتر
    filterset_fields = ['type', 'country', 'verified', 'is_active']

    # البحث
    search_fields = ['title', 'provider', 'description']

    # الترتيب
    ordering_fields = ['deadline', 'created_at']


class OpportunityRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer


class OpportunityTypesView(APIView):
    def get(self, request):
        types = [{"value": t[0], "label": t[1]} for t in OPPORTUNITY_TYPES]
        return Response(types)


class OpportunityCountriesView(APIView):
    def get(self, request):
        countries = Opportunity.objects.values_list('country', flat=True).distinct()
        return Response(sorted(countries))
