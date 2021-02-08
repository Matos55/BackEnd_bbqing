@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Roullote') }}</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6 col-md-5" style="text-align: center">
                            <img src="{{ $roullote->foto ?? 'http://placehold.it/380x500' }}" alt="" class="profile-img img-rounded img-responsive" />
                        </div>
                        <div class="col-sm-6 col-md-7">
                            <h4><strong>{{ $roullote->name ?? '' }}</strong></h4>
                            <hr>
                            <p>
                                {{ $roullote->phone ?? '' }}<br>
                                <small><cite title="San Francisco, USA">{{ $roullote->address ?? '' }}</cite></small>
                            </p>         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
