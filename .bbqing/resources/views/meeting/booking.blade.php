
@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="col-lg-6 pull-left" style="float:left">
                <h2>Meetings</h2>
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

    {{-- Matos MEETINGS TEST --}}
            
<h1>schedule a meeting for re/stocking</h1>
<form action="http://localhost:3001/api/meeting/" method="POST">
    <div>
        <label for="to">id</label>
        <input name="id" id="to" placeholder="Put your id" required>
    </div>
    <div>
      <label for="say">name</label>
      <input name="name" id="say" placeholder="Put your name" required> 
    </div>
    <div>
        <label for="contact">contact</label>
        <input name="contact" id="contact" placeholder="Put your contct" required>
    </div>
    <div>
        <label for="meet_start">meet_start</label>
        <input name="meet_start" id="meet_start" placeholder="datetime-local" type="datetime-local" required>
    </div>
    <div>
        <label for="meet_end">meet_end</label>
        <input name="meet_end" id="meet_end" placeholder="datetime-local" type="datetime-local" required>
    </div>
    <div>
      <button>Send my meeting schedule</button>
    </div>
  </form>

{{-- MATOS API MEETINGS --}}

    
</div>
@endsection


