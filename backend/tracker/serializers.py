from rest_framework import serializers
from .models import Manufacturer, Distributor, Pharmacy, Batch, Transaction, PharmacyInventory

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = '__all__'

class DistributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distributor
        fields = '__all__'

class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    manufacturer_name = serializers.CharField(source='manufacturer.name', read_only=True)
    
    class Meta:
        model = Batch
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    batch_id = serializers.CharField(source='batch.batch_id', read_only=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'

class PharmacyInventorySerializer(serializers.ModelSerializer):
    pharmacy_name = serializers.CharField(source='pharmacy.name', read_only=True)
    medicine_name = serializers.CharField(source='batch.medicine_name', read_only=True)
    batch_id = serializers.CharField(source='batch.batch_id', read_only=True)
    
    class Meta:
        model = PharmacyInventory
        fields = '__all__'