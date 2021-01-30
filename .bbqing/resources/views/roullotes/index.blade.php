@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="col-lg-6 pull-left" style="float:left">
                <h2>Roullotes </h2>
            </div>
            <div class="col-lg-6 pull-right" style="float:right">
                <a style="float:right" class="btn btn-success" href="{{ Route('roullotes.create') }}" title="Nova Roullote"> Nova Roullote </a>
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

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <td>Name</td>
                <td>Address</td>
                <td>Phone</td>
                <td>Foto</td>
                <td>Ações</td>
            </tr>
        </thead>
        <tbody>
        @foreach($roullotes as $key => $value)
            <tr>
                <td>{{ $value->name }}</td>
                <td>{{ $value->address }}</td>
                <td>{{ $value->phone }}</td>
                <td>{{ $value->foto?? 'não há pics'}}</td>
                <td style="text-align: center; min-width:175px;">
                    <a class="btn btn-small btn-success" href="{{ Route('roullotes.show', $value->id) }}"><i class="fa fa-eye"></i></a>
                    {{-- Matos Test --}}
                    {{-- @can('roullotes.update', Auth::user()) --}}
                        <a class="btn btn-small btn-info" href="{{ Route('roullotes.edit', $value->id) }}"><i class="fa fa-edit"></i></a>
                    {{-- @endcan --}}
                    {{-- Matos End --}}
                    <form style="display:inline" method="Post" action="{{ route('roullotes.destroy', $value->id) }}">
                        @csrf @method('DELETE')
                        <button type="submit" class="btn btn-small btn-danger"><i class="fa fa-times"></i></button>
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection
