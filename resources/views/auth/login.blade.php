@extends('layouts.blank')

@section('content')

<div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
            <a href="#" class="h1"><b>{{ __('ESMS') }}</b></a>
            </div>

                <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        
                        <div class="input-group mb-3">
                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Email"  autofocus >
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
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Password">
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

                        <div class="form-group row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                <input type="checkbox" id="remember" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <label class="form-check-label" for="remember">
                                    {{ __('Remember Me') }}
                                    </label>
                            </div>
                        </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-12">
                                <button type="submit" onClick="loginClicked()" class="btn btn-primary btn-block"> {{ __('Login') }}</button>
                            </div>         
                            
                            @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif                   
                        </div>                   
                    </form>
                </div>
        <div class="card-footer text-center py-3">
            <p class="mb-0">Don't have an account yet?<a href="{{ route('register') }}"> Sign Up</a></p>
        </div>
    </div>
</div>

@endsection