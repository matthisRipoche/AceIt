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
  coach: Profil;
  players: Profil[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Profil {
  id: number;
  number: number;
  position: string;
  height: number;
  profilePicturePath?: string | null;
  team: Team;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/api/teams';

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
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // --- CREATE ---
  createTeam(team: Partial<Team>): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team, { headers: this.getHeaders() });
  }

  // --- UPDATE ---
  updateTeam(id: number, team: Partial<Team>): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team, { headers: this.getHeaders() });
  }

  // --- DELETE ---
  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getProfilsByTeamId(id: number): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.apiUrl}/${id}/profils`, { headers: this.getHeaders() });
  }
}
