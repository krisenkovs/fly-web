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

    const contentHeader: Record<string, string> = contentType === 'none' ? {} : { 'content-type': contentType };

    return fetch(url, {
      method,
      body: body,
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...contentHeader,
      },
    })
      .then(async (data) => {

        if (data.status == 200) {
          if (data.headers.get('content-type') === 'application/json') {
            const text = await data.text();

            try {
              return JSON.parse(text);
            } catch (e) {
              return text;
            }
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
