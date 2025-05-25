@extends('template-default')

@section('content')
    <div class="row">
        <div class="col-12 mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">AI English Notebook</h5>

                <div class="d-flex align-items-center">
                    <select id="select-notebooks" class="form-select me-2">
                    </select>

                    <a href="#" id="btn-edit-notebook" class="btn btn-sm btn-primary me-2">
                        <i class="bi bi-pencil-square"></i>
                    </a>

                    <a href="#" id="btn-add-notebook" class="btn btn-sm btn-primary me-2">
                        <i class="bi bi-plus-lg"></i>
                    </a>

                    <a href="#" id="btn-delete-notebook" class="btn btn-sm btn-primary me-2">
                        <i class="bi bi-trash3"></i>
                    </a>

                    <a href="#" id="btn-download-pdf" class="btn btn-sm btn-primary me-2" title="Export notebook in PDF">
                        <i class="bi bi-download"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="mb-0">Write, receive feedback and organize your notes in English</p>
                        <div class="d-flex align-items-center">
                            <label title="Isso muda vocabulário, tom, correções e velocidade de resposta." for="ai-personality" class="me-2 mb-0">AI Personality</label>
                            <select id="ai-personality" class="form-select form-select-sm" style="width: auto;">
                               <option value="teacher">Teacher</option>
                                <option value="helpful">Helpful</option>
                                <option value="fun">Fun</option>
                                <option value="objective">Objective</option>
                                <option value="patient">Patient</option>
                                <option value="motivational">Motivational</option>
                                <option value="strict">Strict</option>
                                <option value="interactive">Interactive</option>
                                <option value="explanatory">Explanatory</option>
                                <option value="summarized">Summarized</option>
                            </select>                              
                        </div>
                    </div>

                    <textarea id="content" class="form-control mb-3 rounded-3" rows="10" placeholder="Write here..."></textarea>
                    
                    <a class="btn btn-outline-danger me-2" href="">
                        Reset <i class="bi bi-x-circle"></i>
                    </a>
                    
                    <button class="btn btn-outline-primary me-2" id="btn-gravar">
                        Record <i class="bi bi-mic"></i>
                    </button>

                    <button id="btn-check-text-ia" class="btn btn-primary">
                        Get Feedback with AI
                        <i class="bi bi-stars"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="ia-result" class="mb-4 d-none">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h5>Feedback da IA</h5>
                        <p>Análise e sugestões para melhorar seu inglês.</p>

                        <div class="alert alert-success" role="alert">
                            <p><i class="bi bi-check-circle"></i> Corrected text</p>
                            <p id="ia-result-corrected-content"></p>
                        </div>

                        <div class="alert alert-warning" role="alert">
                            <p><i class="bi bi-info-circle"></i> Feedback</p>
                            <p id="ia-result-feedback"></p>
                            <p id="ia-result-CEFR"></p>
                        </div>

                        <button id="btn-save-practice" class="btn btn-primary w-100">
                            <i class="bi bi-clipboard2"></i> Salvar esta prática
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <div class="row mt-4">
    <div class="col-12 d-flex align-items-center">
        <div class="flex-grow-1 border-top"></div>
        <h5 class="mb-0 px-3 text-center">Notebook paragraphs</h5>
        <div class="flex-grow-1 border-top"></div>
    </div>
    <div class="row" id="practice-list"></div>
</div>

@include('notebook.modalEditNotebook')
@include('notebook.modalAddNotebook')

@endsection

