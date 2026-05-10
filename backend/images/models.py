from django.db import models


class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')
    title = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']


class Shop(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.TextField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
