from django.urls import path
from .views import *

urlpatterns=[
    path('tasks/',TaskView.as_view()),
    path('schedule/',ScheduleView.as_view()),
   
]