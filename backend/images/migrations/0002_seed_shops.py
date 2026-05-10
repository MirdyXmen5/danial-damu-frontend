from django.db import migrations


SHOPS = [
    {
        'name': 'Danyal-Damu 1',
        'latitude': 42.894081,
        'longitude': 71.345362,
        'address': 'Микрорайон Акбулак, 13а',
    },
    {
        'name': 'Danyal-Damu 2',
        'latitude': 42.915106,
        'longitude': 71.415278,
        'address': 'ул. Мамбет батыра 6, Taraz',
    },
    {
        'name': 'Danyal-Damu 3',
        'latitude': 42.881538,
        'longitude': 71.316805,
        'address': '​Улица Домалак ана, 412',
    },
    {
        'name': 'Danyal-Damu 4',
        'latitude': 42.922091,
        'longitude': 71.373494,
        'address': '​Переулок Аль-Фараби, 56',
    },
    {
        'name': 'Danyal-Damu 5',
        'latitude': 42.914003,
        'longitude': 71.466675,
        'address': '​Улица Барысхан, 85',
    },
]


def create_shops(apps, schema_editor):
    Shop = apps.get_model('images', 'Shop')
    for shop in SHOPS:
        Shop.objects.update_or_create(name=shop['name'], defaults=shop)


def delete_shops(apps, schema_editor):
    Shop = apps.get_model('images', 'Shop')
    Shop.objects.filter(name__in=[shop['name'] for shop in SHOPS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_shops, delete_shops),
    ]
