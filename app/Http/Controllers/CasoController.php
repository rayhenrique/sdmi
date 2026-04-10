<?php

namespace App\Http\Controllers;

use App\Enums\OrigemEncaminhamento;
use App\Enums\RelacaoAgressor;
use App\Enums\StatusCaso;
use App\Enums\TempoConvivencia;
use App\Enums\TipoAtendimento;
use App\Models\Caso;
use App\Models\PessoaAtendida;
use App\Models\TipoViolencia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CasoController extends Controller
{
    public function index(Request $request): Response
    {
        $casos = Caso::query()
            ->with('pessoa:id,nome_completo')
            ->withCount('atendimentos')
            ->when($request->input('busca'), fn ($q, $busca) =>
                $q->whereHas('pessoa', fn ($pq) =>
                    $pq->where('nome_completo', 'like', "%{$busca}%")
                )
            )
            ->when($request->input('status'), fn ($q, $status) =>
                $q->where('status', $status)
            )
            ->when($request->input('origem'), fn ($q, $origem) =>
                $q->where('origem_encaminhamento', $origem)
            )
            ->orderBy('data_abertura', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Casos/Index', [
            'casos' => $casos,
            'filtros' => $request->only(['busca', 'status', 'origem']),
            'statusOptions' => StatusCaso::options(),
            'origemOptions' => OrigemEncaminhamento::options(),
        ]);
    }

    public function create(Request $request): Response
    {
        $pessoaId = $request->input('pessoa_id');
        $pessoa = $pessoaId ? PessoaAtendida::find($pessoaId) : null;

        return Inertia::render('Casos/Form', [
            'pessoa' => $pessoa,
            'pessoas' => PessoaAtendida::ativo()->orderBy('nome_completo')->get(['id', 'nome_completo', 'cpf']),
            'enums' => $this->getEnums(),
            'tiposViolencia' => TipoViolencia::ativo()->orderBy('ordem')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pessoa_id' => 'required|exists:pessoas_atendidas,id',
            'data_abertura' => 'required|date',
            'status' => 'required|string',
            'origem_encaminhamento' => 'nullable|string',
            'medida_protetiva' => 'nullable|boolean',
            'iml' => 'nullable|boolean',
            'tempo_convivencia' => 'nullable|string',
            'relacao_agressor' => 'nullable|string',
            'interesse_curso' => 'nullable|boolean',
            'area_interesse_curso' => 'nullable|string',
            'observacoes_iniciais' => 'nullable|string',
            'tipos_violencia' => 'nullable|array',
            'tipos_violencia.*' => 'exists:tipos_violencia,id',
        ]);

        $tiposViolencia = $validated['tipos_violencia'] ?? [];
        unset($validated['tipos_violencia']);

        $validated['created_by'] = auth()->id();

        $caso = Caso::create($validated);
        $caso->tiposViolencia()->sync($tiposViolencia);

        return redirect()->route('casos.show', $caso)
            ->with('success', 'Caso aberto com sucesso.');
    }

    public function show(Caso $caso): Response
    {
        $caso->load([
            'pessoa',
            'tiposViolencia',
            'atendimentos' => fn ($q) => $q->with('profissional:id,nome,perfil')->orderBy('data_atendimento', 'desc'),
            'criadoPor:id,nome',
        ]);

        return Inertia::render('Casos/Show', [
            'caso' => $caso,
            'statusOptions' => StatusCaso::options(),
            'enums' => [
                'tipo_atendimento' => TipoAtendimento::options(),
            ]
        ]);
    }

    public function edit(Caso $caso): Response
    {
        $caso->load('tiposViolencia');

        return Inertia::render('Casos/Form', [
            'caso' => $caso,
            'pessoa' => $caso->pessoa,
            'pessoas' => PessoaAtendida::ativo()->orderBy('nome_completo')->get(['id', 'nome_completo', 'cpf']),
            'enums' => $this->getEnums(),
            'tiposViolencia' => TipoViolencia::ativo()->orderBy('ordem')->get(),
        ]);
    }

    public function update(Request $request, Caso $caso): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'origem_encaminhamento' => 'nullable|string',
            'medida_protetiva' => 'nullable|boolean',
            'iml' => 'nullable|boolean',
            'tempo_convivencia' => 'nullable|string',
            'relacao_agressor' => 'nullable|string',
            'interesse_curso' => 'nullable|boolean',
            'area_interesse_curso' => 'nullable|string',
            'observacoes_iniciais' => 'nullable|string',
            'tipos_violencia' => 'nullable|array',
            'tipos_violencia.*' => 'exists:tipos_violencia,id',
        ]);

        $tiposViolencia = $validated['tipos_violencia'] ?? [];
        unset($validated['tipos_violencia']);

        $caso->update($validated);
        $caso->tiposViolencia()->sync($tiposViolencia);

        return redirect()->route('casos.show', $caso)
            ->with('success', 'Caso atualizado com sucesso.');
    }

    public function destroy(Caso $caso): RedirectResponse
    {
        $caso->update(['ativo' => false, 'status' => 'arquivado']);

        return redirect()->route('casos.index')
            ->with('success', 'Caso arquivado com sucesso.');
    }

    private function getEnums(): array
    {
        return [
            'status' => StatusCaso::options(),
            'origem_encaminhamento' => OrigemEncaminhamento::options(),
            'tempo_convivencia' => TempoConvivencia::options(),
            'relacao_agressor' => RelacaoAgressor::options(),
        ];
    }
}
