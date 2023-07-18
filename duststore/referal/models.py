from django.db import models
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string
from django.core.exceptions import ValidationError

from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator
from django.db import models


class Customer(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^01[0|1|2|5]{1}[0-9]{8}$',
        message="Please Enter A Valid Egyptian Phone Number"
    )
    customer_phone = models.CharField(validators=[phone_regex], max_length=11, blank=False)
    customer_image = models.ImageField(upload_to='media/users_images', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customer_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customer_user_permissions',
        blank=True,

    )

    
    def get_tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    
    def __str__(self):
        return f"{self.username} {self.id}"
    

class ReferCustomer(models.Model):
    referCustomer_name = models.CharField(max_length = 20, null = False, blank = False)
    phone_regex = RegexValidator(
        regex=r'^01[0|1|2|5]{1}[0-9]{8}$',
        message="Please Enter A Valid Egyptian Phone Number"
    )
    referCustomer_phone = models.CharField(validators=[phone_regex], max_length = 11, null = False, blank = False)
    referCustomer_receipt = models.IntegerField(null = False, validators=[MinValueValidator(1500)])
    referCustomer_code = models.TextField(max_length=7, unique=True, blank = True)
    ReferCustomer_deals_totalpricefirst15days = models.IntegerField(default=0) 
    ReferCustomer_deals_totalpricelast15days = models.IntegerField(default=0)
    revenueEnum = (
        (10, 'Ten'),
        (5, 'Five'),
    )
    referCustomer_revenue =  models.IntegerField(choices=revenueEnum, default=10)
    created_at = models.DateTimeField(default=timezone.now)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            # Generate a random string of 5 characters
            random_str = ''.join(random.choices(string.ascii_uppercase, k=4))
            # Get the highest existing value of the referCustomer_code field
            highest_value = ReferCustomer.objects.aggregate(models.Max('referCustomer_code'))['referCustomer_code__max']
            # If the highest_value is None, set the counter to 1, otherwise add 1 to the highest_value
            counter = 1 if highest_value is None else int(highest_value[4:]) + 1
            # Combine the random string and the counter to create the referCustomer_code value
            self.referCustomer_code = f'{random_str}{counter:03}'
        try:
            super().save(*args, **kwargs)
        except Exception as e:
            print(f"Error saving ReferCustomer instance: {e}")    
    def __str__(self):
        return f"{self.referCustomer_name} {self.id} {' '} {self.referCustomer_code}"


class Receipt(models.Model):
    receipt_owner_name = models.CharField(max_length = 20, null = False, blank = False)
    phone_regex = RegexValidator(
        regex=r'^01[0|1|2|5]{1}[0-9]{8}$',
        message="Please Enter A Valid Egyptian Phone Number"
    )
    receipt_owner_phone = models.CharField(validators=[phone_regex], max_length = 11, null = False, blank = False)
    receipt_owner_referalcode = models.CharField(max_length=7, null = True, blank = True)

    def clean(self):
        if self.receipt_owner_referalcode:
            refer_customer = ReferCustomer.objects.filter(referCustomer_code=self.receipt_owner_referalcode).first()
            if not refer_customer:
                raise ValidationError("Invalid referal code")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    receit_description = models.CharField(max_length = 2000)
    receipt_price = models.IntegerField(null = False)
    created_at = models.DateTimeField(default=timezone.now)

    
    def __str__(self):
        return f"{self.receipt_owner_name} {' '} {self.receipt_owner_referalcode}"

    
    
class Product(models.Model):
    product_name = models.CharField(max_length = 20, null = False, blank = False)
    product_code = models.CharField(max_length = 10)
    product_description = models.CharField(max_length = 2000)
    product_price = models.IntegerField(null = False, blank = False)
    product_receit = models.ForeignKey("Receipt", null = False, blank = False,  on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    
    def __str__(self):
        return f"{self.product_name} {self.id} {' '} {self.product_receit.receipt_owner_name}"

    