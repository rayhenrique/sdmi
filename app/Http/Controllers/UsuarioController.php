<?php

namespace App\Http\Controllers;

use App\Enums\PerfilUsuario;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UsuarioController extends Controller
{
    public function index(Request $request): Response
    {
        $usuarios = User::query()
            ->when($request->input('busca'), fn ($q, $busca) =>
                $q->where('nome', 'like', "%{$busca}%")
                  ->orWhere('email', 'like', "%{$busca}%")
            )
            ->when($request->input('perfil'), fn ($q, $perfil) =>
                $q->where('perfil', $perfil)
            )
            ->when($request->has('ativo'), fn ($q) =>
                $q->where('ativo', $request->boolean('ativo'))
            )
            ->orderBy('nome')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
            'filtros' => $request->only(['busca', 'perfil', 'ativo']),
            'perfis' => PerfilUsuario::options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Usuarios/Form', [
            'perfis' => PerfilUsuario::options(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'perfil' => ['required', Rule::enum(PerfilUsuario::class)],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['ativo'] = true;

        User::create($validated);

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuário criado com sucesso.');
    }

    public function edit(User $usuario): Response
    {
        return Inertia::render('Usuarios/Form', [
            'usuario' => $usuario,
            'perfis' => PerfilUsuario::options(),
        ]);
    }

    public function update(Request $request, User $usuario): RedirectResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($usuario->id)],
            'perfil' => ['required', Rule::enum(PerfilUsuario::class)],
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $usuario->update($validated);

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuário atualizado com sucesso.');
    }

    public function toggle(User $usuario): RedirectResponse
    {
        $usuario->update(['ativo' => !$usuario->ativo]);

        $msg = $usuario->ativo ? 'Usuário ativado.' : 'Usuário desativado.';

        return redirect()->route('usuarios.index')
            ->with('success', $msg);
    }

    public function destroy(User $usuario): RedirectResponse
    {
        if ($usuario->id === auth()->id()) {
            return back()->with('error', 'Você não pode excluir sua própria conta.');
        }

        $usuario->delete();

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuário excluído com sucesso.');
    }
}
