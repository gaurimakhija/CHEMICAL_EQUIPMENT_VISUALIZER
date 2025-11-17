from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class CustomTokenObtainPairView(TokenObtainPairView):
#    You can customize the serializer if needed




 from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(self.get_serializer(user).data, status=status.HTTP_201_CREATED)
        else:
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
