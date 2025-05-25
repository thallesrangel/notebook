<nav class="navbar navbar-expand-lg border-bottom mb-4">
  <div class="container-fluid">

    <a class="navbar-brand" href="{{ route('doc.list') }}">
      <img class="img-fluid" width="50" src="{{ asset('logo.svg')}}"/>
      <span>AI / Notebook</span>
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="{{ route('doc.list') }}">Practice</a>
        </li>

        <li class="nav-item me-3">
          <a class="nav-link" href="{{ route('profile') }}">Profile</a>
        </li>

        <button id="toggleDark" class="btn btn-outline-secondary">
            <i class="bi bi-moon-fill me-1"></i>
        </button>
        
      </ul>
    </div>
  </div>
</nav>
