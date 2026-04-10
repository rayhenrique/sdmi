<?php

namespace App\Http\Controllers;

use App\Enums\CondicaoTrabalho;
use App\Enums\CorRaca;
use App\Enums\Escolaridade;
use App\Enums\EstadoCivil;
use App\Enums\Genero;
use App\Enums\IdentidadeGenero;
use App\Enums\OrientacaoSexual;
use App\Enums\PublicoAtendido;
use App\Enums\Renda;
use App\Models\PessoaAtendida;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PessoaAtendidaController extends Controller
{
    public function index(Request $request): Response
    {
        $pessoas = PessoaAtendida::query()
            ->busca($request->input('busca'))
            ->when($request->input('publico'), fn ($q, $v) => $q->where('publico_atendido', $v))
            ->when($request->has('ativo'), fn ($q) => $q->where('ativo', $request->boolean('ativo')), fn ($q) => $q->ativo())
            ->withCount('casos')
            ->orderBy('nome_completo')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Pessoas/Index', [
            'pessoas' => $pessoas,
            'filtros' => $request->only(['busca', 'publico', 'ativo']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Pessoas/Form', [
            'enums' => $this->getEnums(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatePessoa($request);
        $validated['created_by'] = auth()->id();

        // Check for possible duplicates
        $duplicatas = PessoaAtendida::where(function ($q) use ($validated) {
            $q->where('nome_completo', 'like', '%' . $validated['nome_completo'] . '%');
            if (!empty($validated['cpf'])) {
                $q->orWhere('cpf', $validated['cpf']);
            }
            if (!empty($validated['telefone'])) {
                $q->orWhere('telefone', $validated['telefone']);
            }
        })->exists();

        $pessoa = PessoaAtendida::create($validated);

        $msg = 'Pessoa atendida cadastrada com sucesso.';
        if ($duplicatas) {
            $msg .= ' ⚠️ Atenção: possível cadastro duplicado encontrado.';
        }

        return redirect()->route('pessoas.show', $pessoa)
            ->with('success', $msg);
    }

    public function show(PessoaAtendida $pessoa): Response
    {
        $pessoa->load([
            'casos' => fn ($q) => $q->with(['tiposViolencia', 'atendimentos.profissional'])->orderBy('data_abertura', 'desc'),
        ]);

        return Inertia::render('Pessoas/Show', [
            'pessoa' => $pessoa,
        ]);
    }

    public function edit(PessoaAtendida $pessoa): Response
    {
        return Inertia::render('Pessoas/Form', [
            'pessoa' => $pessoa,
            'enums' => $this->getEnums(),
        ]);
    }

    public function update(Request $request, PessoaAtendida $pessoa): RedirectResponse
    {
        $validated = $this->validatePessoa($request, $pessoa->id);
        $pessoa->update($validated);

        return redirect()->route('pessoas.show', $pessoa)
            ->with('success', 'Dados atualizados com sucesso.');
    }

    public function destroy(PessoaAtendida $pessoa): RedirectResponse
    {
        $pessoa->update(['ativo' => false]);

        return redirect()->route('pessoas.index')
            ->with('success', 'Pessoa desativada com sucesso.');
    }

    private function validatePessoa(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'nome_completo' => 'required|string|max:255',
            'data_nascimento' => 'required|date|before:today',
            'cpf' => ['nullable', 'string', 'max:14', $ignoreId ? "unique:pessoas_atendidas,cpf,{$ignoreId}" : 'unique:pessoas_atendidas,cpf'],
            'telefone' => 'required|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'endereco' => 'nullable|string|max:255',
            'bairro' => 'nullable|string|max:255',
            'cidade' => 'nullable|string|max:255',
            'ubs' => 'nullable|string|max:255',
            'publico_atendido' => 'required|string',
            'genero' => 'nullable|string',
            'identidade_genero' => 'nullable|string',
            'orientacao_sexual' => 'nullable|string',
            'cor_raca' => 'nullable|string',
            'escolaridade' => 'nullable|string',
            'numero_filhos' => 'nullable|integer|min:0',
            'condicao_trabalho' => 'nullable|string',
            'renda' => 'nullable|string',
            'estado_civil' => 'nullable|string',
        ]);
    }

    private function getEnums(): array
    {
        return [
            'publico_atendido' => PublicoAtendido::options(),
            'genero' => Genero::options(),
            'identidade_genero' => IdentidadeGenero::options(),
            'orientacao_sexual' => OrientacaoSexual::options(),
            'cor_raca' => CorRaca::options(),
            'escolaridade' => Escolaridade::options(),
            'condicao_trabalho' => CondicaoTrabalho::options(),
            'renda' => Renda::options(),
            'estado_civil' => EstadoCivil::options(),
        ];
    }
}
