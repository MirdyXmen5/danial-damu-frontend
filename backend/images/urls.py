from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet, ShopViewSet

router = DefaultRouter()
router.register(r'images', ProductImageViewSet, basename='images')  # ← ДОБАВЬ basename
router.register(r'shops', ShopViewSet, basename='shops')

urlpatterns = [
    path('', include(router.urls)),
]
