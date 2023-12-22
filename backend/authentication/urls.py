


from django.urls import path
from .views import *

urlpatterns=[
    path('register/',Register.as_view()),
    path('login/',Login.as_view()),
    path('send_otp/',SendOTP.as_view()),
    path('verify_otp/',OTPLogin.as_view()),
   
]