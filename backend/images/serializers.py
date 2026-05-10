from rest_framework import serializers
from .models import ProductImage, Shop


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'title', 'category', 'order', 'created_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.image:
            ret['image'] = instance.image.url
        return ret

    def validate_image(self, value):
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Размер файла не должен превышать 5MB.")
        
        ext = value.name.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            raise serializers.ValidationError("Поддерживаются только форматы jpg, jpeg, png, webp.")
        return value


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['name', 'latitude', 'longitude', 'address']
