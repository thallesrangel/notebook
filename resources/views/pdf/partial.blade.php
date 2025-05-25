<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Práticas</title>
    <style>
        /* Estilo global */
        body {
            font-family: 'Georgia', serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f4f4f4;
        }

        h2 {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #343a40;
            text-align: center;
        }

        h4 {
            font-weight: bold;
            color: #343a40;
            font-size: 14px;
            margin: 0;
        }

        .card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            margin-top: 15px;
            padding: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-body {
            padding: 5px;
        }

        .card h6 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #495057;
        }

        .text-muted {
            color: #6c757d;
            font-size: 12px;
        }

        .text-success {
            color: #28a745;
        }

        .text-warning {
            color: #ffc107;
        }

        .badge {
            background-color: #343a40;
            color: white;
            padding: 4px 8px;
            font-size: 10px;
            border-radius: 4px;
        }

        .d-flex {
            display: flex;
            justify-content: space-between;
        }

        .small {
            font-size: 11px;
            color: #6c757d;
        }

        .content-text {
            margin-bottom: 10px;
            font-size: 12px;
            color: #333;
        }

        .footer {
            font-size: 10px;
            text-align: center;
            color: #6c757d;
            margin-top: 25px;
        }

        .divider {
            border-top: 1px solid #ddd;
            margin: 10px 0;
        }

        @media print {
            body {
                background-color: #fff;
                color: #000;
            }

            .card {
                page-break-inside: avoid;
            }

            .footer {
                position: fixed;
                bottom: 10px;
                width: 100%;
            }

            h2 {
                font-size: 18px;
                margin-bottom: 15px;
            }

            .card-body {
                padding: 8px;
            }
        }
    </style>
</head>
<body>

<h2>Relatório de Práticas</h2>
<h4>Notebook: {{ $practice->notebook->name }}</h4>

<div class="card">
    <div class="card-body">

        <p class="small text-muted d-flex">
            <span>{{ $practice->created_at ? \Carbon\Carbon::parse($practice->created_at)->format('d/m/Y H:i') : '' }}</span>
        </p>

        <h6>Original text:</h6>
        <p class="content-text">{{ $practice->content }}</p>

        <div class="divider"></div>

        <h6 class="text-success">Corrected text:</h6>
        <p class="content-text">{{ $practice->corrected_content }}</p>

        <div class="divider"></div>

        <h6 class="text-warning">Feedback:</h6>
        <p class="content-text">{{ $practice->feedback }}</p>
    </div>
</div>

<div class="footer">
    <p>Gerado automaticamente.</p>
</div>

</body>
</html>