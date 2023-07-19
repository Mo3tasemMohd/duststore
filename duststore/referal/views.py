from datetime import timedelta, timezone
import datetime
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.generics import DestroyAPIView
from duststore.permissions import IsSuperUser

from rest_framework_simplejwt.tokens import AccessToken

from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

User = get_user_model()
from .models import Customer, Receipt, ReferCustomer, Product
from .serializers import CustomerSerializer, ReceitSerializer, ReferCustomerSerializer, ProductSerializer 

"""USER"""

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():

            password = make_password(serializer.validated_data['password'])

            serializer.validated_data['is_active'] = True
            
            # Save the new customer object
            customer = serializer.save(password = password)

            tokens = customer.get_tokens()
            response_data = {
                'customer': serializer.data,
                'tokens': tokens,
            }
            customer=Customer.objects.get(username=request.data['username'])            
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('access')
        if token:
            user_dict = self.get_user(token)
            response.data['user'] = user_dict
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
        return response
    
    def get_user(self, token):
        # Extract user information from token
        # This may depend on the specific implementation of your User model and token payload
        # Here's an example assuming the user ID is stored in the 'user_id' claim of the token
        decoded_token = AccessToken(token, verify=False)
        user_id = decoded_token['user_id']
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(pk=user_id)
        user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'customer_phone':user.customer_phone,
            'first_name': user.first_name,
            'last_name':user.last_name,
            'is_superuser':user.is_superuser,
            'is_staff':user.is_staff
        }
        return user_dict
class GetCustomers(generics.ListAPIView):
    permission_classes = [IsSuperUser]
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer

@api_view(["GET"])
@permission_classes([IsSuperUser])
def GetCustomer(request, id):
    try:
        customer = Customer.objects.get(id=id)
        serialized_customer = CustomerSerializer(customer)
        return Response(serialized_customer.data, status=200)
    except:
        return Response({"Error - This Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    
"""PRODUCT"""

@api_view(["POST"])
@permission_classes([IsAuthenticated]) 
def AddProduct(request):
    serializered_product = ProductSerializer(data=request.data)
    if serializered_product.is_valid():
        serializered_product.save()
        return Response(serializered_product.data, status=status.HTTP_201_CREATED)
    return Response(serializered_product.errors, status=status.HTTP_400_BAD_REQUEST)

class AllProductListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getProduct(request, id):
    try:
        product = Product.objects.get(id=id)
        serialized_Product = ProductSerializer(product)
        return Response(serialized_Product.data, status=200)
    except:
        return Response({"Error - This Product Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteProduct(request, id):
    try:
        product = Product.objects.get(id=id)
        product.delete()
        return Response("{} is deleted".format(product))
    except:
        return Response({"Error - This Product Does not Exist"}, status=status.HTTP_400_BAD_REQUEST)

"""RECEIPT"""

@api_view(["POST"])
@permission_classes([IsAuthenticated]) 
def AddReceit(request):
    serializered_receit = ReceitSerializer(data=request.data)
    if serializered_receit.is_valid():
        referCustomer_code = request.data['receipt_owner_referalcode']
        try:
            referCustomer = ReferCustomer.objects.get(referCustomer_code=referCustomer_code)
            time_refer_customer_created = referCustomer.created_at
            two_weeks_after_refer_customer_created = referCustomer.created_at + timedelta(days=15)
            month_after_refer_customer_created = referCustomer.created_at + timedelta(days=3)
            timeNow = datetime.datetime.now(timezone.utc)
        except ReferCustomer.DoesNotExist:
            return Response({'Error': 'Invalid Referral code'}, status=status.HTTP_400_BAD_REQUEST)
        if(timeNow > month_after_refer_customer_created):
            return Response({'Error': 'Expired Referral code'}, status=status.HTTP_400_BAD_REQUEST)
        elif(timeNow < month_after_refer_customer_created):
            serializered_receit.save()

            if(timeNow > two_weeks_after_refer_customer_created):
                        referCustomer.ReferCustomer_deals_totalpricelast15days += int(request.data['receipt_price'])
                        
            elif(timeNow < two_weeks_after_refer_customer_created and timeNow > time_refer_customer_created ):
                        referCustomer.ReferCustomer_deals_totalpricefirst15days += int(request.data['receipt_price'])

        referCustomer.save()
        return Response(serializered_receit.data, status=status.HTTP_201_CREATED)
    return Response(serializered_receit.errors, status=status.HTTP_400_BAD_REQUEST)
class AllReceitListAPIView(ListAPIView):
    #permission_classes = [IsAuthenticated]

    queryset = Receipt.objects.all()
    serializer_class = ReceitSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getReceit(request, id):
    try:
        receit = Receipt.objects.get(id=id)
        serialized_Receit = ReceitSerializer(receit)
        return Response(serialized_Receit.data, status=200)
    except:
        return Response({"Error - This Receit Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    

class ReceitListAPIView(ListAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = ReceitSerializer

    def get(self, request, refer_code):
        try:
            refer_customer = ReferCustomer.objects.get(referCustomer_code=refer_code)
            queryset = Receipt.objects.filter(receipt_owner_referalcode=refer_customer.referCustomer_code)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response({'Error': 'Invalid Referal Code'}, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getFirst15DaysReceipts(request, refer_code):
    try:
        refer_customer = ReferCustomer.objects.get(referCustomer_code=refer_code)
        two_weeks_after_refer_customer_created = refer_customer.created_at + timedelta(days=15)
        receipts = Receipt.objects.filter(
            receipt_owner_referalcode=refer_code,
            created_at__gte=refer_customer.created_at,
            created_at__lte=two_weeks_after_refer_customer_created
        )
        serialized_receipts = ReceitSerializer(receipts, many=True)
        return Response(serialized_receipts.data, status=200)
    except ReferCustomer.DoesNotExist:
        return Response({"Error - Invalid referal code"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"Error - {}".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getLast15DaysReceipts(request, refer_code):
    try:
        refer_customer = ReferCustomer.objects.get(referCustomer_code=refer_code)
        two_weeks_after_refer_customer_created = refer_customer.created_at + timedelta(days=15)
        month_after_refer_customer_created = refer_customer.created_at + timedelta(days=30)
        receipts = Receipt.objects.filter(
            receipt_owner_referalcode=refer_code,
            created_at__gte=two_weeks_after_refer_customer_created,
            created_at__lte=month_after_refer_customer_created
        )
        serialized_receipts = ReceitSerializer(receipts, many=True)
        return Response(serialized_receipts.data, status=200)
    except ReferCustomer.DoesNotExist:
        return Response({"Error - Invalid referal code"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"Error - {}".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsSuperUser])
def deleteReceit(request, id):
    try:
        receit = Receipt.objects.get(id=id)
        receit.delete()
        return Response("{} is deleted".format(receit))
    except:
        return Response({"Error - This Receit Does not Exist"}, status=status.HTTP_400_BAD_REQUEST)

"""REFER CUSTOMER"""

@api_view(["POST"])
@permission_classes([IsAuthenticated]) 
def AddReferCustomer(request):
  
    serializered_refercustomer = ReferCustomerSerializer(data=request.data)
    if serializered_refercustomer.is_valid():
        serializered_refercustomer.save()
        return Response(serializered_refercustomer.data, status=status.HTTP_201_CREATED)
    return Response(serializered_refercustomer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllReferCustomersListAPIView(ListAPIView):
    #permission_classes = [IsAuthenticated]
    queryset = ReferCustomer.objects.all()
    serializer_class = ReferCustomerSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getReferCustomersByPhone(request):
    phone_number = request.query_params.get('referCustomer_phone')
    if not phone_number:
        return Response({"Error - Please provide a phone number to search for"}, status=status.HTTP_400_BAD_REQUEST)
    refer_customers = ReferCustomer.objects.filter(referCustomer_phone=phone_number)
    serialized_refer_customers = ReferCustomerSerializer(refer_customers, many=True)
    return Response(serialized_refer_customers.data, status=200)

@api_view(["GET"])
@permission_classes([IsAuthenticated]) 
def getReferCustomer(request, id):
    try:
        refercustomer = ReferCustomer.objects.get(id=id)
        serialized_Refercustomer = ReferCustomerSerializer(refercustomer)
        return Response(serialized_Refercustomer.data, status=200)
    except:
        return Response({"Error - This Refer Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsSuperUser])
def deleteReferCustomer(request, id):
    try:
        refercustomer = ReferCustomer.objects.get(id=id)
        refercustomer.delete()
        return Response("{} is deleted".format(refercustomer))
    except:
        return Response({"Error - This Refer Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

