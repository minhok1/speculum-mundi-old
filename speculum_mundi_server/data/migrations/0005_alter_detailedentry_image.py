# Generated by Django 4.0.3 on 2022-05-23 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0004_alter_detailedentry_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detailedentry',
            name='image',
            field=models.ImageField(blank=True, upload_to='images/'),
        ),
    ]