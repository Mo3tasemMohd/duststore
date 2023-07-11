from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import (api_view, authentication_classes, permission_classes)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.generics import DestroyAPIView

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
            
            customer = serializer.save()
            tokens = customer.get_tokens()
            response_data = {
                'customer': serializer.data,
                'tokens': tokens,
            }
            customer=Customer.objects.get(username=request.data['username'])            
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetCustomers(generics.ListAPIView):
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GetCustomer(request, id):
    try:
        customer = Customer.objects.get(id=id)
        serialized_customer = CustomerSerializer(customer)
        return Response(serialized_customer.data, status=200)
    except:
        return Response({"Error - This Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    
"""PRODUCT"""

@api_view(["POST"])
#@permission_classes([IsAuthenticated]) 
def AddProduct(request):
  
    serializered_product = ProductSerializer(data=request.data)
    if serializered_product.is_valid():
        serializered_product.save()
        return Response(serializered_product.data, status=status.HTTP_201_CREATED)
    return Response(serializered_product.errors, status=status.HTTP_400_BAD_REQUEST)

class AllProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(["GET"])
def getProduct(request, id):
    try:
        product = Product.objects.get(id=id)
        serialized_Product = ProductSerializer(product)
        return Response(serialized_Product.data, status=200)
    except:
        return Response({"Error - This Product Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
#@permission_classes([IsAuthenticated])
def deleteProduct(request, id):
    try:
        product = Product.objects.get(id=id)
        product.delete()
        return Response("{} is deleted".format(product))
    except:
        return Response({"Error - This Product Does not Exist"}, status=status.HTTP_400_BAD_REQUEST)

"""RECEIPT"""

@api_view(["POST"])
#@permission_classes([IsAuthenticated]) 
def AddReceit(request):
    serializered_receit = ReceitSerializer(data=request.data)
    if serializered_receit.is_valid():
        referCustomer_code = request.data['receipt_owner_referalcode']
        try:
            referCustomer = ReferCustomer.objects.get(referCustomer_code=referCustomer_code)
        except ReferCustomer.DoesNotExist:
            return Response({'Error': 'Invalid Referral code'}, status=status.HTTP_400_BAD_REQUEST)
        serializered_receit.save()
        referCustomer.ReferCustomer_deals_totalprice += int(request.data['receipt_price'])
        referCustomer.save()
        print(referCustomer.ReferCustomer_deals_totalprice)
        return Response(serializered_receit.data, status=status.HTTP_201_CREATED)
    return Response(serializered_receit.errors, status=status.HTTP_400_BAD_REQUEST)
class AllReceitListAPIView(ListAPIView):
    queryset = Receipt.objects.all()
    serializer_class = ReceitSerializer

@api_view(["GET"])
def getReceit(request, id):
    try:
        receit = Receipt.objects.get(id=id)
        serialized_Receit = ReceitSerializer(receit)
        return Response(serialized_Receit.data, status=200)
    except:
        return Response({"Error - This Receit Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)
    

class ReceitListAPIView(ListAPIView):
    serializer_class = ReceitSerializer

    def get(self, request, refer_code):
        try:
            refer_customer = ReferCustomer.objects.get(referCustomer_code=refer_code)
            queryset = Receipt.objects.filter(receipt_owner_referalcode=refer_customer.referCustomer_code)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response({'Error': 'Invalid Referal Code'}, status=400)

@api_view(["DELETE"])
#@permission_classes([IsAuthenticated])
def deleteReceit(request, id):
    try:
        receit = Receipt.objects.get(id=id)
        receit.delete()
        return Response("{} is deleted".format(receit))
    except:
        return Response({"Error - This Receit Does not Exist"}, status=status.HTTP_400_BAD_REQUEST)

"""REFER CUSTOMER"""

@api_view(["POST"])
#@permission_classes([IsAuthenticated]) 
def AddReferCustomer(request):
  
    serializered_refercustomer = ReferCustomerSerializer(data=request.data)
    if serializered_refercustomer.is_valid():
        serializered_refercustomer.save()
        return Response(serializered_refercustomer.data, status=status.HTTP_201_CREATED)
    return Response(serializered_refercustomer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllReferCustomersListAPIView(ListAPIView):
    queryset = ReferCustomer.objects.all()
    serializer_class = ReferCustomerSerializer

@api_view(["GET"])
def getReferCustomer(request, id):
    try:
        refercustomer = ReferCustomer.objects.get(id=id)
        serialized_Refercustomer = ReferCustomerSerializer(refercustomer)
        return Response(serialized_Refercustomer.data, status=200)
    except:
        return Response({"Error - This Refer Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
#@permission_classes([IsAuthenticated])
def deleteReferCustomer(request, id):
    try:
        refercustomer = ReferCustomer.objects.get(id=id)
        refercustomer.delete()
        return Response("{} is deleted".format(refercustomer))
    except:
        return Response({"Error - This Refer Customer Doesn’t Exist"}, status=status.HTTP_400_BAD_REQUEST)

