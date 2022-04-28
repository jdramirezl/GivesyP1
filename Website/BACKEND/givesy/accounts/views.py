from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.http import HttpResponse


def register_req(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login_req(request, user)
            messages.success(request, "Registration successful.")
            return redirect("")  # TODO Redirect to index
        messages.error(request, "Unsuccessful registration. Invalid information.")

    form = NewUserForm()
    context = {"register_form": form}
    return render(request=request, template_name="", context=context)


def login_req(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login_req(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect("")  # TODO Redirect to index
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request=request, template_name="main/login.html", context={"login_form": form})


def logout_req(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect("")  # TODO Redirect to index!!!
