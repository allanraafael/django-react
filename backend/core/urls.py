from django.contrib import admin
from django.urls import path
from backend.apps.customers import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customers/', views.customers_list),
    path('api/customers/<int:pk>', views.customers_detail),
]
