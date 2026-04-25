from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ProductImage
from .serializers import ProductImageSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):  # ← Эта остается!
        queryset = ProductImage.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset
