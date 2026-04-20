from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ProductImage
from .serializers import ProductImageSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)

# backend/images/views.py
class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()  # ← ДОБАВЬ ЭТУ СТРОКУ!
    serializer_class = ProductImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):  # ← Эта остается!
        queryset = ProductImage.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset
