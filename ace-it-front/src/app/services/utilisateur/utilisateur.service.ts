import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateUtilisateur {
  firstName: string;
  lastName: string;
  picturePath: string;
  email: string;
  role: string;
  password: string;
}

export interface Utilisateur {
  id: number;
  firstName: string;
  lastName: string;
  picturePath: string;
  email: string;
  role: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // ici on adapte pour CreateUtilisateur
  createUtilisateur(utilisateur: CreateUtilisateur): Observable<void> {
    return this.http.post<void>(this.apiUrl, utilisateur, { headers: this.getHeaders() });
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${utilisateur.id}`, utilisateur, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
