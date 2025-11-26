from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Manufacturer, Distributor, Pharmacy, Batch, Transaction
from .serializers import (
    ManufacturerSerializer, 
    DistributorSerializer, 
    PharmacySerializer, 
    BatchSerializer, 
    TransactionSerializer
)
import requests
import uuid

class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

class DistributorViewSet(viewsets.ModelViewSet):
    queryset = Distributor.objects.all()
    serializer_class = DistributorSerializer

class PharmacyViewSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer

class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


@api_view(['POST'])
def mint_batch(request):
    """
    Endpoint for minting a new batch
    Joel will call this after NFT is minted on blockchain
    """
    try:
        # Get batch data from request
        batch_data = request.data
        
        # Generate unique QR code
        qr_code = str(uuid.uuid4())
        
        # Create batch record
        batch = Batch.objects.create(
            batch_id=batch_data['batch_id'],
            medicine_name=batch_data['medicine_name'],
            composition=batch_data['composition'],
            manufacturer_id=batch_data['manufacturer_id'],
            manufactured_date=batch_data['manufactured_date'],
            expiry_date=batch_data['expiry_date'],
            quantity=batch_data['quantity'],
            policy_id=batch_data.get('policy_id'),
            asset_name=batch_data.get('asset_name'),
            nft_minted=True,
            qr_code=qr_code
        )
        
        # Create mint transaction record
        Transaction.objects.create(
            batch=batch,
            transaction_type='MINT',
            to_wallet=batch_data['manufacturer_wallet'],
            tx_hash=batch_data['tx_hash']
        )
        
        return Response({
            'success': True,
            'batch_id': str(batch.id),
            'qr_code': qr_code,
            'message': 'Batch minted successfully'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def verify_medicine(request, qr_code):
    """
    Endpoint for patients to verify medicine authenticity
    Patient scans QR code, we return batch info + blockchain proof
    """
    try:
        # Find batch by QR code
        batch = Batch.objects.get(qr_code=qr_code)
        
        
        return Response({
            'success': True,
            'medicine_name': batch.medicine_name,
            'batch_id': batch.batch_id,
            'manufacturer': batch.manufacturer.name,
            'manufactured_date': batch.manufactured_date,
            'expiry_date': batch.expiry_date,
            'composition': batch.composition,
            'verified': batch.nft_minted,
            'policy_id': batch.policy_id,
            'asset_name': batch.asset_name
        }, status=status.HTTP_200_OK)
        
    except Batch.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Invalid QR code'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def track_journey(request, batch_id):
    """
    Endpoint to track a batch's journey through supply chain
    Returns all transactions for a batch
    """
    try:
        batch = Batch.objects.get(batch_id=batch_id)
        transactions = Transaction.objects.filter(batch=batch).order_by('timestamp')
        
        journey = []
        for tx in transactions:
            journey.append({
                'type': tx.transaction_type,
                'from': tx.from_wallet,
                'to': tx.to_wallet,
                'timestamp': tx.timestamp,
                'tx_hash': tx.tx_hash
            })
        
        return Response({
            'success': True,
            'batch_id': batch_id,
            'medicine_name': batch.medicine_name,
            'journey': journey
        }, status=status.HTTP_200_OK)
        
    except Batch.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Batch not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)