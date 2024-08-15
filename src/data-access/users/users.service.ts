import { Injectable, computed, signal } from "@angular/core"
import { IUsers } from "./users.interface"

@Injectable({providedIn: 'root'})
export class UsersService {
    
    protected state = signal<IUsers | undefined>(undefined)
    public currentUser = computed(() => this.state());
 
    public updateCurrentUser(user:IUsers) : void {
        this.state.update((s) => ({...s,...user}))
    }
    
    public setCurrentUser(user : IUsers): void {
        this.state.set(user);
    }
    
}