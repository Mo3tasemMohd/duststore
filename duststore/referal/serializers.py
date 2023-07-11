from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from .models import Customer, Receipt, ReferCustomer, Product
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


# class CustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Customer
#         fields = ['id', 'username', 'email', 'customer_phone', 'customer_image', 'created_at']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
    
#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         hashed_password = make_password(password)
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=hashed_password
#         )
#         customer = Customer.objects.create(
#             user=user,
#             customer_phone=validated_data['customer_phone'],
#             customer_image=validated_data.get('customer_image', None),
#         )
#         customer_group = Group.objects.get(name='Customer')
#         user.groups.set([customer_group])
#         return customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'
        extra_kwargs = {
            'password' : {'write_only': True}
        }
        
    
    # def create(self, validated_data):
    #         password = validated_data.pop('password', None)
    #         instance = self.Meta.model(**validated_data)
    #         if password is not None:
    #             instance.set_password(password)
    #         instance.save()
    #         return instance

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ReceitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'

class ReferCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferCustomer
        fields = '__all__'
