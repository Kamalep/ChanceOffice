from rest_framework import serializers
from .models import Opportunity, Country, OpportunityType, FundingType


# ----------------------------------------------------
# Serializers للدول
# ----------------------------------------------------
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name_en", "name_ar", "code", "flag"]


# ----------------------------------------------------
# Serializers لأنواع الفرص
# ----------------------------------------------------
class OpportunityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityType
        fields = ["id", "value", "label_en", "label_ar", "description"]


# ----------------------------------------------------
# Serializers لأنواع التمويل
# ----------------------------------------------------
class FundingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingType
        fields = ["id", "value", "label_en", "label_ar"]


# ----------------------------------------------------
# Serializer للفرص (مع nested data)
# ----------------------------------------------------
class OpportunitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)
    type = OpportunityTypeSerializer(read_only=True)
    funding_type = FundingTypeSerializer(read_only=True)

    country_id = serializers.PrimaryKeyRelatedField(
        queryset=Country.objects.all(), source="country", write_only=True
    )
    type_id = serializers.PrimaryKeyRelatedField(
        queryset=OpportunityType.objects.all(), source="type", write_only=True
    )
    funding_type_id = serializers.PrimaryKeyRelatedField(
        queryset=FundingType.objects.all(), source="funding_type", write_only=True
    )

    class Meta:
        model = Opportunity
        fields = "__all__"


    class Meta:
        model = Opportunity
        fields = "__all__"
