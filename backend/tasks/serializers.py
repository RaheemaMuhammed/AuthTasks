from .models import *
from rest_framework import serializers
from bson import ObjectId

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields='__all__'


class PostTaskSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = ['_id','title', 'description', 'completed', 'user']

    def get__id(self, obj):
        return str(obj.id) if obj.id else str(ObjectId()) 


class PostScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['_id', 'task', 'scheduled_date', 'scheduled_time']



class ScheduleSerializer(serializers.ModelSerializer):
    task = serializers.SerializerMethodField()
    task_completed = serializers.SerializerMethodField()

    def get_task_completed(self, obj):
        return obj.task.completed

    def get_task(self, obj):
        return str(obj.task.title) 

    class Meta:
        model = Schedule
        fields = ['_id', 'task', 'scheduled_date', 'scheduled_time','task_completed']