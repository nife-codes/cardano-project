from django.db import models
import uuid

class Manufacturer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    wallet_address = models.CharField(max_length=255, unique=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Distributor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    wallet_address = models.CharField(max_length=255, unique=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Pharmacy(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    wallet_address = models.CharField(max_length=255, unique=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Batch(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    batch_id = models.CharField(max_length=100, unique=True)
    medicine_name = models.CharField(max_length=255)
    composition = models.TextField()
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    manufactured_date = models.DateField()
    expiry_date = models.DateField()
    quantity = models.IntegerField()
    
    # NFT/Blockchain data
    policy_id = models.CharField(max_length=255, blank=True, null=True)
    asset_name = models.CharField(max_length=255, blank=True, null=True)
    nft_minted = models.BooleanField(default=False)
    
    # QR code
    qr_code = models.CharField(max_length=255, unique=True, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.medicine_name} - {self.batch_id}"

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('MINT', 'Minted'),
        ('TRANSFER', 'Transferred'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    from_wallet = models.CharField(max_length=255, blank=True, null=True)
    to_wallet = models.CharField(max_length=255)
    tx_hash = models.CharField(max_length=255, unique=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.transaction_type} - {self.batch.batch_id}"