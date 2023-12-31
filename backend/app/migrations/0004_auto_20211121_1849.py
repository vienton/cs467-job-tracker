# Generated by Django 3.2.9 on 2021-11-21 18:49

import datetime
from django.conf import settings
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0003_merge_0002_auto_20211119_0054_0002_auto_20211121_1644'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='application',
            name='applied_date',
            field=models.DateField(default=datetime.date(2021, 11, 21)),
        ),
        migrations.AlterField(
            model_name='application',
            name='close_date',
            field=models.DateField(default=datetime.date(2021, 11, 21)),
        ),
        migrations.AlterField(
            model_name='job',
            name='applied',
            field=models.ManyToManyField(related_name='applied_jobs', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='job',
            name='open_date',
            field=models.DateField(default=datetime.date(2021, 11, 21)),
        ),
        migrations.AlterField(
            model_name='job',
            name='saved',
            field=models.ManyToManyField(related_name='saved_jobs', to=settings.AUTH_USER_MODEL),
        ),
    ]
