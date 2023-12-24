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
        fields = ['_id', 'title', 'description', 'completed', 'user']

    def get__id(self, obj):
        return str(obj.id) if obj.id else str(ObjectId())  # Generate ObjectId if ID is None
