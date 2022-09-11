export class HTTPService {
  private token?: string;

  public setToken(token: string) {
    this.token = token;
  }

  private makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT',
    url: string,
    data?: any,
    contentType: string = 'application/json',
  ) {
    const body = contentType === 'application/json' ? JSON.stringify(data) : data;

    return fetch(url, {
      method,
      body: body,
      headers: { Authorization: `Bearer ${this.token}`, 'content-type': contentType },
    })
      .then((data) => {
        if (data.status == 200) {
          if (data.headers.get('content-type') === 'application/json') {
            return data.json();
          } else {
            return data.text();
          }
        } else {
          return Promise.reject('error');
        }
      })
      .catch((e) => Promise.reject(e));
  }

  public post<I, O>(url: string, data: I, contentType?: string) {
    return this.makeRequest<O>('POST', url, data, contentType);
  }

  public put<I, O>(url: string, data: I, contentType?: string) {
    return this.makeRequest<O>('PUT', url, data, contentType);
  }

  public get<O>(url: string) {
    return this.makeRequest('GET', url);
  }
}
