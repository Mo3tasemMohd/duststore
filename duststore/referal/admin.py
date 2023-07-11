from django.contrib import admin

from .models import Customer, Receipt, ReferCustomer, Product

admin.site.register(Customer)
admin.site.register(Receipt)
admin.site.register(ReferCustomer)
admin.site.register(Product)
