from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet

router = DefaultRouter()
router.register(r'images', ProductImageViewSet, basename='images')  # ← ДОБАВЬ basename

urlpatterns = [
    path('', include(router.urls)),
]
