@extends('layouts.blank')

@section('content')
<div class="login-box">
  <div class="card card-outline card-primary">
        <div class="card-header text-center">{{ __('Reset Password') }}</div>

                <div class="card-body">
                <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div class="input-group mb-3">
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Email">
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

                        <div class="row my-2">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">{{ __('Send Password Reset Link') }}</button>
                            </div>
                        </div>                                              
                    </form>
                    <p class="mt-3 mb-1">
                        <a href="{{ route('login') }}">{{__('Back to Login')}}</a>
                    </p>
                </div>
            </div>
        </div>
@endsection
