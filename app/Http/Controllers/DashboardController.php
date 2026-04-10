<?php

namespace App\Http\Controllers;

use App\Models\Atendimento;
use App\Models\Caso;
use App\Models\PessoaAtendida;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $inicio = $request->input('inicio', Carbon::now()->startOfMonth()->toDateString());
        $fim = $request->input('fim', Carbon::now()->endOfMonth()->toDateString());

        $atendimentosMes = Atendimento::whereBetween('data_atendimento', [$inicio, $fim])->count();
        $casosNovos = Caso::where('status', 'novo')->whereBetween('data_abertura', [$inicio, $fim])->count();
        $casosEmAcompanhamento = Caso::where('status', 'em_acompanhamento')->count();
        $casosAguardandoRetorno = Caso::where('status', 'aguardando_retorno')->count();
        $casosEncerrados = Caso::where('status', 'encerrado')->whereBetween('updated_at', [$inicio, $fim])->count();
        $totalPessoas = PessoaAtendida::where('ativo', true)->count();

        // Distribution by professional
        $porProfissional = Atendimento::whereBetween('data_atendimento', [$inicio, $fim])
            ->selectRaw('profissional_id, count(*) as total')
            ->groupBy('profissional_id')
            ->with('profissional:id,nome,perfil')
            ->get()
            ->map(fn ($item) => [
                'profissional' => $item->profissional?->nome ?? 'N/A',
                'perfil' => $item->profissional?->perfil?->label() ?? 'N/A',
                'total' => $item->total,
            ]);

        // Distribution by service type
        $porTipo = Atendimento::whereBetween('data_atendimento', [$inicio, $fim])
            ->selectRaw('tipo_atendimento, count(*) as total')
            ->groupBy('tipo_atendimento')
            ->get()
            ->map(fn ($item) => [
                'tipo' => $item->tipo_atendimento->label(),
                'value' => $item->tipo_atendimento->value,
                'total' => $item->total,
            ]);

        // Recent cases
        $casosRecentes = Caso::with('pessoa:id,nome_completo')
            ->latest('data_abertura')
            ->limit(5)
            ->get()
            ->map(fn ($caso) => [
                'id' => $caso->id,
                'pessoa' => $caso->pessoa?->nome_completo,
                'status' => $caso->status->value,
                'status_label' => $caso->status->label(),
                'data_abertura' => $caso->data_abertura->format('d/m/Y'),
            ]);

        return Inertia::render('Dashboard', [
            'stats' => [
                'atendimentos_mes' => $atendimentosMes,
                'casos_novos' => $casosNovos,
                'em_acompanhamento' => $casosEmAcompanhamento,
                'aguardando_retorno' => $casosAguardandoRetorno,
                'encerrados' => $casosEncerrados,
                'total_pessoas' => $totalPessoas,
            ],
            'porProfissional' => $porProfissional,
            'porTipo' => $porTipo,
            'casosRecentes' => $casosRecentes,
            'filtros' => [
                'inicio' => $inicio,
                'fim' => $fim,
            ],
        ]);
    }
}
