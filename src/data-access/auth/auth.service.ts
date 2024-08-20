import { Injectable, computed, signal } from "@angular/core";
import { AuthStateEnum, IAuthState } from "./auth.interface";

@Injectable({providedIn: 'root'})
export class AuthService{
    protected state = signal<IAuthState | undefined>(undefined);

    public authState = computed(() => this.state());

    public get isAuthenticated(): boolean{
        return this.authState() !== undefined;
    }

    public updateAuthState(authState:IAuthState) : void {
        this.state.update((s) => ({...s,...authState}))
    }
    
    public setAuthState(authState : IAuthState): void {
        this.state.set(authState);
    }
}