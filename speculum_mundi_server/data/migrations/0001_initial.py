# Generated by Django 4.0.3 on 2022-05-11 18:09

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=120)),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='LocationInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x_coordinate', models.FloatField()),
                ('y_coordinate', models.FloatField()),
                ('geography', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CauseEffect',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='data.entry')),
            ],
            bases=('data.entry',),
        ),
        migrations.CreateModel(
            name='DetailedEntry',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='data.entry')),
                ('content', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('source', models.URLField(blank=True)),
            ],
            bases=('data.entry',),
        ),
        migrations.CreateModel(
            name='Discussion',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='data.entry')),
            ],
            bases=('data.entry',),
        ),
        migrations.CreateModel(
            name='LocationShift',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='data.entry')),
            ],
            bases=('data.entry',),
        ),
    ]
