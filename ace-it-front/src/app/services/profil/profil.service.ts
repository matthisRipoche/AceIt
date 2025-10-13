import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  picturePath?: string | null;
}

export interface Team {
  id: number;
  name: string;
  division: string;
  teamPicturePath?: string | null;
}

export interface Profil {
  id: number;
  number: number;
  position: string;
  height: number;
  profilePicturePath?: string | null;
  team: Team;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'http://localhost:8080/api/profils';

  constructor(private http: HttpClient) {}

  // Création d'un header avec token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // --- READ ---
  getProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProfilById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // --- CREATE ---
  createProfil(profil: Partial<Profil>): Observable<Profil> {
    return this.http.post<Profil>(this.apiUrl, profil, { headers: this.getHeaders() });
  }

  // --- UPDATE ---
  updateProfil(id: number, profil: Partial<Profil>): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiUrl}/${id}`, profil, { headers: this.getHeaders() });
  }

  // --- DELETE ---
  deleteProfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
