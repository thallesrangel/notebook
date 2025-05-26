@extends('template-default')

@section('content')

<div class="container mt-5">
  <h4 class="mb-4 text-center">Profile</h4>

  <form id="profile-form" action="{{ route('profile.update') }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <div class="mb-3">
      <label for="full-name" class="form-label">Full Name</label>
      <input type="text" class="form-control" id="full-name" name="full_name" value="{{ $user->name ?? '' }}" placeholder="Enter your full name" required>
    </div>

    <div class="mb-3">
      <label for="feedback-language" class="form-label">Language Feedback</label>
      <select class="form-select" id="feedback-language" name="feedback_language" required>
        <option value="portugues" {{ $user->feedback_language == 'portugues' ? 'selected' : '' }}>Português</option>
        <option value="english" {{ $user->feedback_language == 'english' ? 'selected' : '' }}>English</option>
      </select>
    </div>
    
    <button type="submit" class="btn btn-primary">Save</button>
  </form>

  @if(session('success'))
    <div class="alert alert-success mt-3">
      {{ session('success') }}
    </div>
  @endif


  <div id="alert-placeholder" class="mt-3"></div>
</div>

@endsection