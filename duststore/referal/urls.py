#from .views import ObtainTokenPairView
from rest_framework_simplejwt.views import (TokenRefreshView, TokenObtainPairView)

from django.urls import path
from . import views

from django.contrib.auth import get_user_model
User = get_user_model()

urlpatterns = [
   # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',views.register),
    path('getusers/',views.GetCustomers.as_view()),
    path('getuser/<int:id>/', views.GetCustomer, name='user_profile'),
    
    
    path('addRefercustomer/', views.AddReferCustomer),
    path('refercustomers/', views.AllReferCustomersListAPIView.as_view(), name='referCustomer_list'),
    path('refercustomers', views.getReferCustomersByPhone, name='get_refer_customers_by_phone'),
    path('refercustomer/<int:id>/', views.getReferCustomer, name='get_referCustomer'),
    path('refercustomer/<int:id>/delete/', views.deleteReferCustomer, name='referCustomer_delete'),

    path('addReceit/', views.AddReceit),
    path('receits/', views.AllReceitListAPIView.as_view(), name='receipt_list'),
    path('receits/<str:refer_code>/', views.ReceitListAPIView.as_view(), name='receipt_list'),
    path('receits/<str:refer_code>/first15days/', views.getFirst15DaysReceipts, name='receipt_list'),
    path('receits/<str:refer_code>/last15days/', views.getLast15DaysReceipts, name='receipt_list'),


    path('receit/<int:id>/', views.getReceit, name='get_receit'),
    path('receit/<int:id>/delete/', views.deleteReceit, name='receipt_delete'),

    path('addProduct/', views.AddProduct),
    path('products/', views.AllProductListAPIView.as_view(), name='product_list'),
    path('product/<int:id>/', views.getProduct, name='get_product'),
    path('product/<int:id>/delete/', views.deleteProduct, name='product_delete'),

    



]