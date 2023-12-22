
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework.response import Response
from .emails import send_otp_via_email
from django.contrib.auth import authenticate,login
from .models import CustomUser
# Create your views here.

class Register(APIView):
    def post(self,request):
        try:
            data=request.data
            serializer=RegisterSerializer(data=data)
            if serializer.is_valid():
                user=serializer.save()
                
                return Response({'status':201,
                                 'message':'Successfully Registered.',
                                 'data': {'username': user.username, 'email': user.email},
             })
            return Response({'status':400,
                             'message':'Error',
                             'error':serializer.errors
                             
                             })
        except Exception as e:
            return Response(
                {
                    'status': 500,
                    'message': 'An error occurred during registration.',
                    'error': str(e)
                })



class Login(APIView):
    def post(self,request):
        try:
            data=request.data
            email=data['email']
            password=data['password']
            user=authenticate(email=email,password=password)
            if user is not None:
               
                    username=user.username
                    login(request,user)
                    return Response({'message':'you are successfully logged in',
                                    'status':200,
                                     'username': user.username,
                                     'email': user.email,
                    })
               
            else:
                return Response({
                    'status':401,
                    'message':'invalid email or password'
                })
        except Exception as e:
            return Response({'error':e,'status':400})


class SendOTP(APIView):
    def post(self,request):
        try:
            data=request.data
            email=data['email']
            send_otp_via_email(email)
            return Response({
                'status': 200,
                'message': 'OTP sent successfully to your email.',
            })
        except Exception as e:
            return Response({'error':e,'status':400})




class OTPLogin(APIView):
    def post(self,request):
        try:
            data=request.data
            email = data['email']
            otp_entered = data['otp']

            user = CustomUser.objects.get(email=email)
            if user.otp == otp_entered:
                user.otp = None
                user.save()
                login(request,user)

                return Response({'status': 200,'message': 'OTP verification successful. You are logged in.' })
            else:
                return Response({'status': 401,'message': 'Invalid OTP entered.', })
        except Exception as e:
            return Response({'status': 400,'error': str(e)})
