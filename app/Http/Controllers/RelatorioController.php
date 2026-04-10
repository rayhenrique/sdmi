<?php

namespace App\Http\Controllers;

use App\Models\Atendimento;
use App\Models\Caso;
use App\Models\PessoaAtendida;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    public function index(Request $request)
    {
        $inicio = $request->input('inicio', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $fim = $request->input('fim', Carbon::now()->endOfDay()->format('Y-m-d'));
        
        $fimFilter = Carbon::parse($fim)->endOfDay();

        // 1. DADOS QUANTITATIVOS (VISÃO AGREGADA)
        
        // --- MÉTRICAS DE CASOS ---
        $casosNoPeriodo = Caso::with(['pessoa', 'tiposViolencia'])
            ->whereBetween('data_abertura', [$inicio, $fimFilter])
            ->get();

        $totalCasos = $casosNoPeriodo->count();
        $medidasProtetivas = $casosNoPeriodo->where('medida_protetiva', true)->count();
        $passaramIml = $casosNoPeriodo->where('iml', true)->count();

        // Agrupamentos de Casos
        $casosPorStatus = $casosNoPeriodo->groupBy('status')->map->count();
        $casosPorOrigem = $casosNoPeriodo->groupBy('origem_encaminhamento')->map->count();
        $casosPorRelacao = $casosNoPeriodo->groupBy('relacao_agressor')->map->count();
        
        // Contagem de Violências (Pode ter mais de uma por caso)
        $tiposViolenciaCounts = [];
        foreach ($casosNoPeriodo as $caso) {
            foreach ($caso->tiposViolencia as $tv) {
                $tiposViolenciaCounts[$tv->nome] = ($tiposViolenciaCounts[$tv->nome] ?? 0) + 1;
            }
        }
        arsort($tiposViolenciaCounts);

        // --- MÉTRICAS SOCIODEMOGRÁFICAS (Das Pessoas vinculadas aos Casos no período) ---
        $pessoasId = $casosNoPeriodo->pluck('pessoa_id')->unique();
        $pessoasEnvolvidas = PessoaAtendida::whereIn('id', $pessoasId)->get();
        
        $pessoasPorBairro = $pessoasEnvolvidas->groupBy('bairro')->map->count();
        $pessoasPorRaca = $pessoasEnvolvidas->groupBy('cor_raca')->map->count();
        $pessoasPorRenda = $pessoasEnvolvidas->groupBy('renda')->map->count();

        // --- MÉTRICAS DE ATENDIMENTOS ---
        $atendimentosNoPeriodo = Atendimento::with(['profissional', 'caso.pessoa'])
            ->whereBetween('data_atendimento', [$inicio, $fimFilter])
            ->orderBy('data_atendimento', 'desc')
            ->get();

        $totalAtendimentos = $atendimentosNoPeriodo->count();
        
        // Agrupamentos Atendimentos
        $atendimentosPorTipo = $atendimentosNoPeriodo->groupBy('tipo_atendimento')->map->count();
        $atendimentosPorProfissional = $atendimentosNoPeriodo->groupBy(function($atend) {
            return $atend->profissional ? $atend->profissional->nome : 'Desconhecido';
        })->map->count();

        $relatoriosDetalhados = Atendimento::with(['profissional', 'caso.pessoa'])
            ->whereBetween('data_atendimento', [$inicio, $fimFilter])
            ->orderBy('data_atendimento', 'desc')
            ->paginate(20)
            ->withQueryString()
            ->through(function ($atend) {
                return [
                    'id' => $atend->id,
                    'data_atendimento_br' => $atend->data_atendimento_br,
                    'profissional' => $atend->profissional ? $atend->profissional->nome : 'Desconhecido',
                    'tipo_atendimento' => strtoupper($atend->tipo_atendimento?->value ?? ''),
                    'caso_id' => $atend->caso_id,
                    'pessoa_nome' => $atend->caso && $atend->caso->pessoa ? $atend->caso->pessoa->nome_completo : 'N/I',
                    'relato' => $atend->relato,
                    'evolucao' => $atend->evolucao,
                    'encaminhamento' => $atend->encaminhamento_realizado,
                ];
            });

        // 3. ESTRUTURAR RESPONSE PARA O INERTIA
        // Formatamos para Array para facilitar a renderização de gráficos em CSS
        $formatChartData = function ($collection) {
            $formatted = [];
            foreach ($collection as $key => $value) {
                $formatted[] = ['name' => $key ?: 'Não Informado', 'total' => $value];
            }
            // Ordenar do maior pro menor total
            usort($formatted, fn($a, $b) => $b['total'] <=> $a['total']);
            return $formatted;
        };

        return Inertia::render('Relatorios/Index', [
            'filtros' => [
                'inicio' => $inicio,
                'fim' => $fim,
            ],
            'totais' => [
                'casos' => $totalCasos,
                'atendimentos' => $totalAtendimentos,
                'medidas_protetivas' => $medidasProtetivas,
                'iml' => $passaramIml,
            ],
            'charts' => [
                'status' => $formatChartData($casosPorStatus),
                'origem' => $formatChartData($casosPorOrigem),
                'violencia' => $formatChartData($tiposViolenciaCounts),
                'bairro' => $formatChartData($pessoasPorBairro),
                'raca' => $formatChartData($pessoasPorRaca),
                'atendimento_tipo' => $formatChartData($atendimentosPorTipo),
                'atendimento_profissional' => $formatChartData($atendimentosPorProfissional),
            ],
            'qualitativo' => $relatoriosDetalhados
        ]);
    }

    public function exportar(Request $request)
    {
        $tipo = $request->input('tipo', 'casos'); // 'casos' ou 'atendimentos'
        $inicio = $request->input('inicio', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $fim = $request->input('fim', Carbon::now()->endOfDay()->format('Y-m-d'));
        $fimFilter = Carbon::parse($fim)->endOfDay();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=relatorio_{$tipo}_{$inicio}_a_{$fim}.csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use ($tipo, $inicio, $fimFilter) {
            $file = fopen('php://output', 'w');
            fputs($file, $bom =(chr(0xEF) . chr(0xBB) . chr(0xBF))); // UTF-8 BOM para Excel

            if ($tipo === 'casos') {
                fputcsv($file, [
                    'ID', 'Pessoa Atendida', 'CPF', 'Idade', 'Bairro', 
                    'Data Abertura', 'Status', 'Origem Encaminhamento', 
                    'Medida Protetiva', 'Passou IML', 'Violências Registradas'
                ], ';');

                Caso::with(['pessoa', 'tiposViolencia'])
                    ->whereBetween('data_abertura', [$inicio, $fimFilter])
                    ->chunk(100, function ($casos) use ($file) {
                        foreach ($casos as $caso) {
                            $violencias = $caso->tiposViolencia->pluck('nome')->implode(', ');
                            fputcsv($file, [
                                $caso->id,
                                $caso->pessoa ? $caso->pessoa->nome_completo : '',
                                $caso->pessoa ? $caso->pessoa->cpf : '',
                                $caso->pessoa ? $caso->pessoa->idade : '',
                                $caso->pessoa ? $caso->pessoa->bairro : '',
                                $caso->data_abertura_br,
                                $caso->status_label,
                                $caso->origem_encaminhamento_label,
                                $caso->medida_protetiva ? 'Sim' : 'Não',
                                $caso->iml ? 'Sim' : 'Não',
                                $violencias
                            ], ';');
                        }
                    });

            } else if ($tipo === 'atendimentos') {
                fputcsv($file, [
                    'ID Atendimento', 'Data/Hora', 'Caso ID', 'Pessoa Atendida', 
                    'Profissional', 'Tipo Atendimento', 'Relato (início)', 'Encaminhamento'
                ], ';');

                Atendimento::with(['profissional', 'caso.pessoa'])
                    ->whereBetween('data_atendimento', [$inicio, $fimFilter])
                    ->orderBy('data_atendimento', 'desc')
                    ->chunk(100, function ($atendimentos) use ($file) {
                        foreach ($atendimentos as $atend) {
                            fputcsv($file, [
                                $atend->id,
                                $atend->data_atendimento_br,
                                $atend->caso_id,
                                $atend->caso && $atend->caso->pessoa ? $atend->caso->pessoa->nome_completo : '',
                                $atend->profissional ? $atend->profissional->nome : '',
                                strtoupper($atend->tipo_atendimento?->value ?? ''),
                                mb_substr($atend->relato, 0, 100) . '...',
                                $atend->encaminhamento_realizado,
                            ], ';');
                        }
                    });
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
