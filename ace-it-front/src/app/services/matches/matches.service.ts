import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Match {
  id: number;
  teamHome: Team;
  teamAwayName: string;
  date: Date;
  location: string;
  createdAt: Date;
}

export interface Team {
  id: number;
  name: string;
  division: string;
  teamPicturePath?: string | null;
  coach: Profil;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profil {
  id: number;
  number: number;
  position: string;
  height: number;
  profilePicturePath?: string | null;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  picturePath?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  
  private apiUrl = 'http://localhost:8080/api/matches';

  constructor(private http: HttpClient) {}

  // Création d'un header avec token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createMatch(match: Partial<Match>): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, match, { headers: this.getHeaders() });
  }

  updateMatch(id: number, match: Partial<Match>): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/${id}`, match, { headers: this.getHeaders() });
  }

  deleteMatch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
