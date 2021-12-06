@extends('layouts.blank')

@section('content')
<div class="register-box">
  <div class="card card-outline card-primary">
        <div class="card-header text-center">
                    <a href="#" class="h1"><b>{{ __('ESMS') }}</b></a>
        </div>

                <div class="card-body">
                <p class="login-box-msg">Register a new membership</p>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        
                        <div class="input-group mb-3">
                            <input input id="username" type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="off" autofocus placeholder="Username">
                            @error('username')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>   

                        <div class="input-group mb-3">
                            <input input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="off" autofocus placeholder="Full name">
                            @error('name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>                    
                        
                        <div class="input-group mb-3">
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required  placeholder="Email">
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>                     

                        <div class="input-group mb-3">
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="off" placeholder="Password">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            <div class="input-group-append">
                                <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                      
                        <div class="input-group mb-3">
                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="off" placeholder="Confirm password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        </div>                      

                        <div class="form-group row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                    <a href="{{ route('login') }}" class="text-center">I already have a membership</a>
                </div>               
            </div>
        </div>
@endsection
