import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, UserProfileCreate } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/user-profile';

  getActiveProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/active`);
  }

  getProfileById(profileId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/${profileId}`);
  }

  getProfileByUserId(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/user/${userId}`);
  }

  createProfile(profile: UserProfileCreate): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.API_URL, profile);
  }

  updateProfile(profileId: string, profile: UserProfileCreate): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/${profileId}`, profile);
  }

  deleteProfile(profileId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${profileId}`);
  }
}