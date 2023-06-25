from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dcim', '0173_project_name'),
    ]

    operations = [
		migrations.AddField(
            model_name='rack',
            name='project_name',
            field=models.CharField(max_length=64,blank=True,null=True)
		),
		migrations.AddField(
            model_name='site',
            name='project_name',
            field=models.CharField(max_length=64,blank=True,null=True)
		),
        migrations.AddField(
            model_name='location',
            name='project_name',
            field=models.CharField(max_length=64,blank=True,null=True)
		)
    ]