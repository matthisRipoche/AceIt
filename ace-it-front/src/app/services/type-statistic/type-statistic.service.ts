import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TypeStatistic {
  id: number;
  name: string;
  teamId: Team;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: number;
  name: string;
  division: string;
  teamPicturePath?: string | null;
  coach: Profil;
  players: Profil[];
  ListTypeStatistics: TypeStatistic[];
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
export class TypeStatisticService {
  private apiUrl = 'http://localhost:8080/api/types_statistics';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getAllTypeStatistics(): Observable<TypeStatistic[]> {
    return this.http.get<TypeStatistic[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTypeStatisticsById(id: number): Observable<TypeStatistic> {
    return this.http.get<TypeStatistic>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createTypeStatistic(typeStatistic: TypeStatistic): Observable<TypeStatistic> {
    return this.http.post<TypeStatistic>(this.apiUrl, typeStatistic, { headers: this.getHeaders() });
  }

  updateTypeStatistic(id: number, typeStatistic: TypeStatistic): Observable<TypeStatistic> {
    return this.http.put<TypeStatistic>(`${this.apiUrl}/${id}`, typeStatistic, { headers: this.getHeaders() });
  }

  deleteTypeStatistic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getTypeStatisticsByTeamId(teamId: number): Observable<TypeStatistic[]> {
    return this.http.get<TypeStatistic[]>(`${this.apiUrl}/team/${teamId}`, { headers: this.getHeaders() });
  }
}