import './bootstrap';



$(function () {
    const darkModeKey = 'darkModeEnabled';

    // Verifica se o dark mode estava ativado anteriormente
    if (localStorage.getItem(darkModeKey) === 'true') {
        $('body').addClass('dark-mode');
        $('#toggleDark').html('<i class="bi bi-brightness-high-fill me-1"></i>');
    }

    $('#toggleDark').on('click', function () {
        const isDark = $('body').toggleClass('dark-mode').hasClass('dark-mode');

        // Atualiza texto do botão
        $(this).html(
            isDark
                ? '<i class="bi bi-brightness-high-fill me-1"></i>'
                : '<i class="bi bi-moon-fill me-1"></i>'
        );

        // Salva preferência no localStorage
        localStorage.setItem(darkModeKey, isDark);
    });
});



$(document).ready(function () {
    $.ajax({
        url: '/notebooks-list',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let $select = $('#select-notebooks');
            $select.empty();

            $.each(data, function (index, notebook) {
                $select.append(
                    $('<option>', {
                        value: notebook.id,
                        text: notebook.name,
                        selected: index === 0
                    })
                );
            });

            const notebookId = $select.val();
            loadPractices(notebookId);
        },
        error: function (xhr, status, error) {
            alert_error('Erro', 'Erro ao carregar notebooks.');
        }
    });

    $('#select-notebooks').on('change', function () {
        const notebookId = $(this).val();
        loadPractices(notebookId);
    });

    $('#btn-download-pdf').on('click', function () {
        var notebookId = $('#select-notebooks').val();

        if (!notebookId) {
            alert('Selecione um notebook antes.');
            return;
        }

        var url = '/practice/total/' + notebookId + '/pdf';

        window.open(url, '_blank');
    });

});

$(document).ready(function () {
    $('#btn-edit-notebook').on('click', function (e) {
        e.preventDefault();
        const $select = $('#select-notebooks');
        const notebookId = $select.val();
        const $selectedOption = $select.find('option:selected');
        const notebookName = $selectedOption.text();

        $('#edit-notebook-name').val(notebookName);
        $('#modalEditNotebook').modal('show');

        $('#confirm-edit-notebook').off('click').on('click', function () {
            const newName = $('#edit-notebook-name').val();

            $.ajax({
                url: '/notebooks/' + notebookId,
                method: 'PUT',
                data: {
                    name: newName,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('#modalEditNotebook').modal('hide');
                    alert_success('Notebook atualizado', 'Nome alterado com sucesso');

                    $selectedOption.text(newName);
                },
                error: function (err) {
                    alert_error('Erro', 'Erro ao atualizar notebook');
                }
            });
        });
    });

    $('#btn-add-notebook').on('click', function (e) {
        e.preventDefault();
        $('#add-notebook-name').val('');
        $('#modalAddNotebook').modal('show');

        $('#confirm-add-notebook').off('click').on('click', function () {
            const newName = $('#add-notebook-name').val();

            $.ajax({
                url: '/notebooks',
                method: 'POST',
                data: {
                    name: newName,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('#modalAddNotebook').modal('hide');
                    alert_success('Sucesso', 'Notebook adicionado');

                    const newNotebookId = response.notebook.id;

                    const $select = $('#select-notebooks');
                    $select.append(
                        $('<option>', {
                            value: newNotebookId,
                            text: newName,
                            selected: true
                        })
                    );

                    loadPractices(newNotebookId);
                },
                error: function (err) {
                    alert_error('Erro', 'Erro ao adicionar notebook.');
                }
            });
        });
    });


    $(function () {
        let notebookIdToDelete = null;

        $('#btn-delete-notebook').on('click', function (e) {
            e.preventDefault();
            const $select = $('#select-notebooks');
            notebookIdToDelete = $select.val();

            if (!notebookIdToDelete) {
                alert('Selecione um notebook para excluir.');
                return;
            }

            const notebookName = $select.find('option:selected').text();
            $('#notebookNameToDelete').text(notebookName);

            // Abrir o modal Bootstrap
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        });

        $('#confirmDeleteBtn').on('click', function () {
            if (!notebookIdToDelete) return;

            $.ajax({
                url: '/notebooks/' + notebookIdToDelete,
                method: 'DELETE',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    alert_success('Sucesso', 'Notebook excluído');

                    // Remover opção do select
                    const $select = $('#select-notebooks');
                    $select.find('option[value="' + notebookIdToDelete + '"]').remove();

                    // Selecionar a primeira opção e carregar práticas
                    $select.find('option:first').prop('selected', true);
                    const newNotebookId = $select.val();
                    loadPractices(newNotebookId);

                    // Fechar o modal
                    const modalEl = document.getElementById('confirmDeleteModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    modal.hide();

                    // Resetar variável
                    notebookIdToDelete = null;
                },
                error: function (err) {
                    alert_error('Erro', 'Erro ao excluir notebook.');
                }
            });
        });
    });


});


$('#btn-check-text-ia').on('click', function (e) {
    e.preventDefault();

    if (!$('#content').val()) {
        alert_error('Erro', "Escreva um texto para praticar.");
        return;
    }

    var contractData = {
        content: $('#content').val(),
        ai_personality: $('#ai-personality').val()
    };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#loadingModal').modal('show');

    $.ajax({
        url: `${APP_URL}/notebook/check-text`,
        method: 'POST',
        data: contractData,
        success: function (response) {
            $('#loadingModal').modal('hide');
            $('#ia-result').removeClass('d-none');

            $('#ia-result-corrected-content').text(response.corrigido);
            $('#ia-result-feedback').text(response.feedback);
            $('#ia-result-CEFR').text(response.CEFR)

        },
        error: function (xhr, status, error) {
            $('#loadingModal').modal('hide');

            var content = "";

            $.each(data.responseJSON.errors, function (key, value) {
                content += '<p>' + value + '</p>';
            });

            alert_error('Erro', content);
        }
    });
});

$('#btn-save-practice').on('click', function (e) {
    e.preventDefault();

    const original = $('#content').val();
    const corrigido = $('#ia-result-corrected-content').text();
    const feedback = $('#ia-result-feedback').text();
    const CEFR = $('#ia-result-CEFR').text();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: `${APP_URL}/notebook/store-practice`,
        method: 'POST',
        data: {
            original: original,
            corrigido: corrigido,
            feedback: feedback,
            notebook_id: $('#select-notebooks').val(),
            CEFR: CEFR
        },
        success: function (response) {
            alert_success('Salvo com sucesso!', 'Sua prática foi salva.');
            renderPracticeItem(response.item);

            $('#ia-result').addClass('d-none');
            $('#content').val("");
            $('#ia-result-corrected-content').text("");
            $('#ia-result-feedback').text("");
        },
        error: function (xhr) {
            alert_error('Erro', 'Não foi possível salvar a prática.');
        }
    });
});


function renderPracticeItem(item) {
    const html = `
    <div class="col-12 col-md-6">
        <div class="card mt-4 mb-4">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <small class="text-muted">${item.created_at ?? ''}</small>
                    <span class="badge bg-primary">${item.CEFR}</span>
                </div>

                <h6 class="text-uppercase text-secondary fw-bold mb-2">Original text</h6>
                <p class="card-text mb-4">${item.content}</p>

                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="text-uppercase text-success fw-bold mb-0">Corrected text</h6>
                    <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center speak-corrected-content" 
                            data-id="${item.id}" title="Ouvir texto corrigido" 
                            style="width: 36px; height: 36px;">
                        <i class="bi bi-volume-up fs-5"></i>
                    </button>
                </div>
                <p class="card-text corrected-content-text mb-4" data-id="${item.id}">${item.corrected_content}</p>

                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="text-uppercase text-warning fw-bold mb-0">Feedback</h6>
                    <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center speak-feedback" 
                            data-id="${item.id}" title="Ouvir feedback" 
                            style="width: 36px; height: 36px;">
                        <i class="bi bi-volume-up fs-5"></i>
                    </button>
                </div>
                <p class="card-text feedback-text mb-4" data-id="${item.id}">${item.feedback}</p>

                <div class="text-end">
                    <a href="${APP_URL}/practice/partial/${item.id}/pdf" target="_blank" class="btn btn-sm btn-primary rounded-pill px-4 py-2">
                        PDF <i class="bi bi-download me-1"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;

    $('#practice-list').prepend(html);
}

function loadPractices(notebookId) {
    $.ajax({
        url: `${APP_URL}/notebook/list/${notebookId}`,
        method: 'GET',
        success: function (response) {
            $('#practice-list').empty();

            if (response.items && response.items.length > 0) {
                response.items.forEach(item => renderPracticeItem(item));
            } else {
                $('#practice-list').html(`
                    <div class="text-center py-4">
                        <p class="fs-5 mb-2">No practices found</p>
                        <p class="text-muted mb-0">Type an English sentence and click check to get started.</p>
                    </div>
                `);
            }
        },
        error: function () {
            alert('Erro ao carregar práticas.');
        }
    });
}




/// Recog

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

$(document).ready(function () {
    var isListening = false;
    var finalTranscript = '';
    var interimTranscript = '';

    function startRecognition() {
        recognition.start();
        isListening = true;
        $('#btn-gravar').text('Pause').append(' <i class="bi bi-mic-mute"></i>');
    }

    function stopRecognition() {
        recognition.stop();
        isListening = false;
        $('#btn-gravar').text('Start Recording');
    }

    recognition.onresult = function (event) {
        interimTranscript = ''; // limpa o que estava antes

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            var transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        $('#content').val(finalTranscript + interimTranscript);
    };

    $('#btn-gravar').click(function (e) {
        e.preventDefault();
        if (!isListening) {
            startRecognition();
        } else {
            stopRecognition();
        }
    });

    $('#content').on('input', function () {
        const currentText = $(this).val();
        const fullTranscript = finalTranscript + interimTranscript;

        if (currentText === '') {
            finalTranscript = '';
            interimTranscript = '';
        } else if (currentText === fullTranscript) {
            return;
        } else if (fullTranscript.startsWith(currentText)) {
            const removedLength = fullTranscript.length - currentText.length;
            if (interimTranscript.length >= removedLength) {
                interimTranscript = interimTranscript.slice(0, -removedLength);
            } else {
                const diff = removedLength - interimTranscript.length;
                interimTranscript = '';
                finalTranscript = finalTranscript.slice(0, -diff);
            }
        } else {
            // Usuário editou manualmente, aceita como novo ponto de partida
            finalTranscript = currentText;
            interimTranscript = '';
        }
    });

    recognition.onend = function () {
        if (isListening) recognition.start();
    };
});


$(document).on('click', '.speak-corrected-content', function () {
    const id = $(this).data('id');

    const feedbackText = $(`.corrected-content-text[data-id="${id}"]`).text();

    if (!window.speechSynthesis) {
        alert('Seu navegador não suporta leitura por voz.');
        return;
    }

    if (!feedbackText) {
        alert('Nenhum texto de corrigido encontrado.');
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(feedbackText.trim());

    utterance.lang = 'en-US';
    utterance.onstart = () => console.log('Leitura iniciada');
    utterance.onerror = (e) => console.error('Erro na leitura:', e);
    utterance.onend = () => console.log('Leitura finalizada');

    window.speechSynthesis.speak(utterance);
});


$(document).on('click', '.speak-feedback', function () {
    const id = $(this).data('id');

    const feedbackText = $(`.feedback-text[data-id="${id}"]`).text();

    if (!window.speechSynthesis) {
        alert('Seu navegador não suporta leitura por voz.');
        return;
    }

    if (!feedbackText) {
        alert('Nenhum texto de feedback encontrado.');
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(feedbackText.trim());

    // utterance.lang = 'en-US'; // ou 'pt-BR' se desejar
    utterance.lang = 'pt-BR';

    // Eventos de debug (opcional)
    utterance.onstart = () => console.log('Leitura iniciada');
    utterance.onerror = (e) => console.error('Erro na leitura:', e);
    utterance.onend = () => console.log('Leitura finalizada');

    window.speechSynthesis.speak(utterance);
});











$('#modalIndice').on('shown.bs.modal', function () {
    $.ajax({
        url: `${APP_URL}/notebook/list/${$('#select-notebooks').val()}`,
        method: 'GET',
        success: function (response) {
            $('#index-left').empty();

            if (response.items && response.items.length > 0) {
                const $ul = $('<ul class="list-group"></ul>');

                response.items.forEach(item => {
                    const preview = item.content.length > 20 ? item.content.substring(0, 20) + '...' : item.content;

                    const formattedDate = moment(item.created_at).format('DD/MM/YYYY HH:mm');

                    const $li = $(`
                        <li 
                            class="list-group-item d-flex justify-content-between align-items-center notebook-paragraph-item" 
                            data-notebook-paragraph-id="${item.id}"
                        >
                            <span>${preview}</span>
                            <small class="text-muted">${formattedDate}</small>
                        </li>
                    `);

                    $ul.append($li);
                });

                $('#index-left').append($ul);
            } else {
                $('#index-left').html(`
                    <div class="text-center py-4">
                        <p class="fs-5 mb-2">No practices found</p>
                    </div>
                `);
            }
        },
        error: function () {
            alert('Erro ao carregar práticas.');
        }
    });
});

$(document).on('click', '.notebook-paragraph-item', function () {

    $('#loadingModal').modal('show');

    $('.notebook-paragraph-item').removeClass('active');
    $(this).addClass('active');

    const paragraphId = $(this).data('notebook-paragraph-id');

    $.ajax({
        url: `${APP_URL}/practice/get-notebook-paragraph/${paragraphId}`,
        method: 'GET',
        success: function (response) {
            const item = response.paragraph;

            const html = `
                <div class="card mt-4 mb-4">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">${item.created_at_formatted ?? ''}</small>
                            <span class="badge bg-primary">${item.CEFR ?? ''}</span>
                        </div>

                        <h6 class="text-uppercase text-secondary fw-bold mb-2">Original text</h6>
                        <p class="card-text mb-4">${item.content}</p>

                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="text-uppercase text-success fw-bold mb-0">Corrected text</h6>
                            <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center speak-corrected-content" 
                                    data-id="${item.id}" title="Ouvir texto corrigido" 
                                    style="width: 36px; height: 36px;">
                                <i class="bi bi-volume-up fs-5"></i>
                            </button>
                        </div>
                        <p class="card-text corrected-content-text mb-4" data-id="${item.id}">${item.corrected_content}</p>

                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="text-uppercase text-warning fw-bold mb-0">Feedback</h6>
                            <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center speak-feedback" 
                                    data-id="${item.id}" title="Ouvir feedback" 
                                    style="width: 36px; height: 36px;">
                                <i class="bi bi-volume-up fs-5"></i>
                            </button>
                        </div>
                        <p class="card-text feedback-text mb-4" data-id="${item.id}">${item.feedback}</p>

                        <div class="text-end">
                            <a href="${APP_URL}/practice/partial/${item.id}/pdf" target="_blank" class="btn btn-sm btn-primary rounded-pill px-4 py-2">
                                PDF <i class="bi bi-download me-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            $('#index-right').html(html);

            $('#loadingModal').modal('hide');
        },
        error: function () {
            $('#loadingModal').modal('hide');
            alert('Erro ao carregar parágrafo.');
        }
    });
});