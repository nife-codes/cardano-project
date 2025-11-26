from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'manufacturers', views.ManufacturerViewSet)
router.register(r'distributors', views.DistributorViewSet)
router.register(r'pharmacies', views.PharmacyViewSet)
router.register(r'batches', views.BatchViewSet)
router.register(r'transactions', views.TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('mint/', views.mint_batch, name='mint-batch'),
    path('verify/<str:qr_code>/', views.verify_medicine, name='verify-medicine'),
    path('journey/<str:batch_id>/', views.track_journey, name='track-journey'),
]