const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  async request(endpoint: string, options: RequestInit = {}, requireAuth: boolean = false) {
    const url = `${API_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token && requireAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401 || response.status === 403) {
        // Token expired or invalid
        localStorage.removeItem('auth_token');
        localStorage.removeItem('odoo_user');
        window.location.href = '/sign-in';
        throw new Error('Unauthorized');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth
  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signUp(name: string, email: string, password: string, role: string = 'employee') {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me', {}, true);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }, true);
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }, true);
  }

  async deleteAccount(password: string) {
    return this.request('/auth/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    }, true);
  }

  // Notes
  async getNotes(userId: number = 1) {
    return this.request(`/notes?userId=${userId}`);
  }

  async createNote(note: any) {
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }

  async updateNote(id: number, note: any) {
    return this.request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
    });
  }

  async togglePinNote(id: number) {
    return this.request(`/notes/${id}/pin`, {
      method: 'PATCH',
    });
  }

  async deleteNote(id: number) {
    return this.request(`/notes/${id}`, {
      method: 'DELETE',
    });
  }

  // Documents
  async getDocuments(userId: number = 1) {
    return this.request(`/documents?userId=${userId}`);
  }

  async uploadDocument(document: any) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(document),
    });
  }

  async deleteDocument(id: number) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(project: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: number, project: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  // Events
  async getEvents(userId: number = 1) {
    return this.request(`/events?userId=${userId}`);
  }

  async createEvent(event: any) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Attendance
  async getAttendance(userId?: number) {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/attendance${query}`);
  }

  async checkIn(userId: number = 1) {
    return this.request('/attendance/check-in', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async checkOut(userId: number = 1) {
    return this.request('/attendance/check-out', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Time Off
  async getTimeOff(userId?: number) {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/time-off${query}`);
  }

  async createTimeOffRequest(request: any) {
    return this.request('/time-off', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateTimeOffStatus(id: number, status: string, approvedBy?: number) {
    return this.request(`/time-off/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, approvedBy }),
    });
  }

  // Benefits
  async getBenefits(userId: number = 1) {
    return this.request(`/benefits?userId=${userId}`);
  }

  async enrollBenefit(benefit: any) {
    return this.request('/benefits', {
      method: 'POST',
      body: JSON.stringify(benefit),
    });
  }

  async unenrollBenefit(id: number) {
    return this.request(`/benefits/${id}`, {
      method: 'DELETE',
    });
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }

  async getUser(id: number) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id: number, userData: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
}

export const api = new ApiService();
