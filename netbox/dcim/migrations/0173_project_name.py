from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dcim', '0172_larger_power_draw_values'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='project_name',
            field=models.CharField(max_length=64,blank=True,null=True)
		)
    ]