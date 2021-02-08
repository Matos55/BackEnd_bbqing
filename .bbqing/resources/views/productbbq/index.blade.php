@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="col-lg-6 pull-left" style="float:left">
                <h2>Produtos BBQ </h2>
            </div>
        </div>
    </div>

    <!-- will be used to show any messages -->
    @if (Session::has('message'))
        <div class="alert alert-info">{{ Session::get('message') }}</div>
    @endif

    @if ($errors->any())
      <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
        </ul>
      </div><br />
    @endif

    <table class="table table-striped table-dark">
        <thead>
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Price</td>
            </tr>
        </thead>
        <tbody>
        @foreach($bbq as $key => $value)
            <tr>
                <td>{{ $value['id'] }}</td>
                <td>{{ $value['name'] }}</td>
                <td>{{ $value['price'] }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection
