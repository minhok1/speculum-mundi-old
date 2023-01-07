# Generated by Django 4.0.3 on 2023-01-07 21:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0009_entry_shared'),
    ]

    operations = [
        migrations.AddField(
            model_name='opinion',
            name='stance',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='causeeffect',
            name='cause',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cause_effect_cause', to='data.timelineevent'),
        ),
        migrations.AlterField(
            model_name='causeeffect',
            name='effect',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cause_effect_effect', to='data.timelineevent'),
        ),
        migrations.AlterField(
            model_name='discussion',
            name='abstract_context',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discussion_abstract', to='data.abstract'),
        ),
        migrations.AlterField(
            model_name='discussion',
            name='cause_effect_context',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discussion_cause_effect', to='data.causeeffect'),
        ),
        migrations.AlterField(
            model_name='discussion',
            name='location_shift_context',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discussion_location_shift', to='data.locationshift'),
        ),
        migrations.AlterField(
            model_name='discussion',
            name='timeline_event_context',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discussion_timeline_event', to='data.timelineevent'),
        ),
        migrations.AlterField(
            model_name='locationshift',
            name='destination_timeline_event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location_shift_destination', to='data.timelineevent'),
        ),
        migrations.AlterField(
            model_name='locationshift',
            name='origin_timeline_event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location_shift_origin', to='data.timelineevent'),
        ),
        migrations.AlterField(
            model_name='opinion',
            name='thread',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='opinions', to='data.discussion'),
        ),
        migrations.AlterField(
            model_name='timelineevent',
            name='context',
            field=models.ManyToManyField(blank=True, related_name='timeline_event_context', to='data.abstract'),
        ),
        migrations.AlterField(
            model_name='timelineevent',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='timeline_event_location', to='data.abstract'),
        ),
    ]
