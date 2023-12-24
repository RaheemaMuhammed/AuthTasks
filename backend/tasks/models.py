from django.db import models
from authentication.models import CustomUser
from djongo import models as djmodels




class Task(models.Model):
    _id = djmodels.ObjectIdField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Schedule(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()

    def __str__(self):
        return f"{self.task.title} - {self.scheduled_date}"
