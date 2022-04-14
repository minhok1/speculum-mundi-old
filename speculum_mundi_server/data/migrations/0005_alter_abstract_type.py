# Generated by Django 4.0.3 on 2022-04-14 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0004_remove_locationinfo_timeline_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='abstract',
            name='type',
            field=models.CharField(choices=[('LOCATION', 'Location'), ('EVENT', 'Event'), ('PERSON', 'Person'), ('IDEA', 'Idea'), ('COUNTRY', 'Country'), ('ORGANIZATION', 'Organization'), ('ARTIFACT', 'Artifact'), ('MANUSCRIPT', 'Manuscript')], default='EVENT', max_length=30),
        ),
    ]
