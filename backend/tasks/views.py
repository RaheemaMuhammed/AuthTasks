from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from bson import ObjectId

# Create your views here.


class TaskView(APIView):
    def get(self,request):
        try:
            tasks=Task.objects.all().order_by('completed','-created_at')
            serializer=TaskSerializer(tasks,many=True)
            return Response({'payload':serializer.data,'status':200,'message':'OK'})
        except Exception as e:
            return Response({'error':str(e),'status':404})

    def post(self,request):
        try:
            data=request.data
            user=CustomUser.objects.get(email=data['user'])
            data['user']=user.id
            serializer=PostTaskSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':201,'message':'Task Created'})
            else:
                return Response({'status':400,'message':'Invalid Data','error':serializer.errors})
        except Exception as e:
            return Response({'status':400,'message':'something went wrong','error':str(e)})
        
    def patch(self,request):
        try:
            data=request.data
            id=ObjectId(data['id'])
            task=Task.objects.get(_id=id)
            serializer=PostTaskSerializer(instance=task,data=data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':200,'message':'Updated Successfully'})
            else:
                return Response({'status':400,'error':serializer.errors,'message':'Invalid Data'})
            
        except Exception as e:
            return Response({'status':400,'error':str(e),'message':'Something Went Wrong'})
    
    def delete(self,request):
        try:
            id=request.GET.get('id')
            task=Task.objects.get(_id=ObjectId(id))
            task.delete()
            return Response({'status':200,'message':"OK"})
        except Exception as e:
            return Response({'status':400,'message':"Something went Wrong",'error':str(e)})


class ScheduleView(APIView):
    def get(self, request):
        try:

            schedules = Schedule.objects.all()
            serializer = ScheduleSerializer(schedules, many=True)
            return Response({'payload': serializer.data, 'status': 200, 'message': 'OK'})
        except Exception as e:
            return Response({'error': str(e), 'status': 404})

    def post(self, request):
        try:
            data = request.data
            task_id = data['task_id']
            data['task']=ObjectId(task_id)
            serializer = PostScheduleSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
           
                return Response({'status': 201, 'message': 'Schedule Created'})
            else:
                return Response({'status':400,'message':'Invalid Data','error':serializer.errors})

        except Exception as e:
            return Response({'status': 400, 'message': 'Something went wrong', 'error': str(e)})